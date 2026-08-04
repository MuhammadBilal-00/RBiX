<?php
/**
 * Minimal, dependency-free SMTP client for the RBiX contact form.
 *
 * This is original code written for this project — NOT a vendored copy of
 * PHPMailer or any other third-party library. It exists because vendoring a
 * real third-party mail library verbatim without being able to fetch and
 * diff it against the actual upstream source is not something to do
 * reliably from memory — a large multi-file library reproduced that way
 * cannot be trusted to be byte-correct, and shipping it under someone
 * else's name/license would be misleading regardless. This class instead
 * implements exactly the narrow slice of SMTP this one form needs: submit
 * a single plain-text message over an authenticated, STARTTLS connection.
 * It is small enough to read end to end before trusting it.
 *
 * Supports: EHLO, STARTTLS, AUTH LOGIN, MAIL FROM/RCPT TO/DATA, plain-text
 * body, one recipient, one Reply-To. Nothing else (no HTML mail, no
 * attachments, no multiple recipients) — this form doesn't need them.
 */

declare(strict_types=1);

final class SmtpMailerException extends \Exception
{
}

final class SmtpMailer
{
    private string $host;
    private int $port;
    private string $username;
    private string $password;
    private int $timeoutSeconds;

    public function __construct(string $host, int $port, string $username, string $password, int $timeoutSeconds = 15)
    {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
        $this->timeoutSeconds = $timeoutSeconds;
    }

    /**
     * @throws SmtpMailerException on any SMTP-level failure
     */
    public function send(
        string $to,
        string $from,
        string $fromName,
        string $replyTo,
        string $subject,
        string $body
    ): void {
        $socket = @stream_socket_client(
            "tcp://{$this->host}:{$this->port}",
            $errno,
            $errstr,
            $this->timeoutSeconds
        );
        if ($socket === false) {
            throw new SmtpMailerException("Could not connect to {$this->host}:{$this->port} — {$errstr} ({$errno})");
        }
        stream_set_timeout($socket, $this->timeoutSeconds);

        try {
            $this->expect($socket, 220, 'connection banner');

            $this->command($socket, 'EHLO ' . $this->localHostname(), 250, 'EHLO');

            // Upgrade to TLS before sending any credentials.
            $this->command($socket, 'STARTTLS', 220, 'STARTTLS');
            if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new SmtpMailerException('TLS negotiation failed');
            }

            // Must re-EHLO after STARTTLS per RFC 3207.
            $this->command($socket, 'EHLO ' . $this->localHostname(), 250, 'EHLO (post-STARTTLS)');

            if ($this->username !== '') {
                $this->command($socket, 'AUTH LOGIN', 334, 'AUTH LOGIN');
                $this->command($socket, base64_encode($this->username), 334, 'AUTH username');
                $this->command($socket, base64_encode($this->password), 235, 'AUTH password');
            }

            $this->command($socket, "MAIL FROM:<{$from}>", 250, 'MAIL FROM');
            $this->command($socket, "RCPT TO:<{$to}>", [250, 251], 'RCPT TO');
            $this->command($socket, 'DATA', 354, 'DATA');

            $message = $this->buildMessage($to, $from, $fromName, $replyTo, $subject, $body);
            $this->write($socket, $message . "\r\n.");
            $this->expect($socket, 250, 'end of DATA');

            $this->command($socket, 'QUIT', 221, 'QUIT');
        } finally {
            fclose($socket);
        }
    }

    /**
     * @param resource $socket
     */
    private function command($socket, string $line, int|array $expectedCodes, string $context): string
    {
        $this->write($socket, $line);
        return $this->expect($socket, $expectedCodes, $context);
    }

    /**
     * @param resource $socket
     */
    private function write($socket, string $line): void
    {
        $result = @fwrite($socket, $line . "\r\n");
        if ($result === false) {
            throw new SmtpMailerException('Failed writing to SMTP socket');
        }
    }

    /**
     * Reads one (possibly multi-line) SMTP response and asserts its status
     * code matches what's expected for this step.
     *
     * @param resource $socket
     */
    private function expect($socket, int|array $expectedCodes, string $context): string
    {
        $expected = is_array($expectedCodes) ? $expectedCodes : [$expectedCodes];
        $response = '';
        $code = null;

        while (!feof($socket)) {
            $line = fgets($socket, 515);
            if ($line === false) {
                break;
            }
            $response .= $line;
            $code = (int) substr($line, 0, 3);
            // A hyphen after the code (e.g. "250-") means more lines follow;
            // a space means this is the final line of the response.
            if (strlen($line) < 4 || $line[3] !== '-') {
                break;
            }
        }

        if ($code === null || !in_array($code, $expected, true)) {
            throw new SmtpMailerException("Unexpected SMTP response during {$context}: " . trim($response));
        }

        return $response;
    }

    private function buildMessage(string $to, string $from, string $fromName, string $replyTo, string $subject, string $body): string
    {
        $encodedFromName = $this->encodeHeaderWord($fromName);
        $headers = [
            "From: {$encodedFromName} <{$from}>",
            "To: <{$to}>",
            "Reply-To: <{$replyTo}>",
            'Subject: ' . $this->encodeHeaderWord($subject),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'Date: ' . date('r'),
        ];

        // Per RFC 5321, a lone leading "." on a line must be escaped as ".."
        // so it isn't mistaken for the end-of-DATA marker.
        $escapedBody = preg_replace('/^\./m', '..', $body);

        return implode("\r\n", $headers) . "\r\n\r\n" . $escapedBody;
    }

    private function encodeHeaderWord(string $value): string
    {
        // Only need MIME encoded-words if the value isn't plain ASCII —
        // names/subjects here are expected to be ASCII in practice, but this
        // keeps the header safe if a submitter uses non-ASCII characters.
        if (preg_match('/[^\x20-\x7E]/', $value) === 1) {
            return '=?UTF-8?B?' . base64_encode($value) . '?=';
        }
        return $value;
    }

    private function localHostname(): string
    {
        return $_SERVER['SERVER_NAME'] ?? 'localhost';
    }
}
