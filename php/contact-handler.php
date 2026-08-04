<?php
/**
 * Contact form handler for rbixtechnologies.com.
 *
 * Plain PHP, no Composer, no autoloader — must run unmodified on stock
 * shared cPanel hosting after uploading this directory alongside the
 * exported Next.js `out/` build. NOT executed/tested locally: this machine
 * has no PHP interpreter installed. Written carefully to spec; verify on
 * real PHP (local CLI or cPanel staging) before relying on it in production.
 *
 * SMTP delivery uses php/lib/SmtpMailer.php — a small, original,
 * dependency-free SMTP client written for this project (see that file's
 * header comment for why this isn't a vendored copy of PHPMailer or any
 * other third-party library). If SMTP_HOST is left blank in config.php,
 * the mail() fallback below is used instead, with zero dependencies.
 */

declare(strict_types=1);

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

require_once __DIR__ . '/lib/SmtpMailer.php';

const RATE_LIMIT_MAX_PER_HOUR = 5;
const RATE_LIMIT_WINDOW_SECONDS = 3600;

function respond(int $httpStatus, array $body): void
{
    http_response_code($httpStatus);
    echo json_encode($body);
    exit;
}

/**
 * @return array<string, mixed>|null null if config.php has not been
 *   deployed yet (it's gitignored — copy config.example.php to config.php
 *   and fill in real values).
 */
function loadConfig(): ?array
{
    $configPath = __DIR__ . '/config.php';
    if (!file_exists($configPath)) {
        return null;
    }
    $config = require $configPath;
    return is_array($config) ? $config : null;
}

function clientIp(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

/** Strips CR/LF so a value can never be used to inject extra mail headers. */
function sanitizeHeaderValue(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function logError(string $message): void
{
    $dir = __DIR__ . '/data/logs';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    $line = sprintf("[%s] %s\n", date('c'), $message);
    @file_put_contents($dir . '/errors.log', $line, FILE_APPEND | LOCK_EX);
}

/**
 * Flat-file token-bucket rate limiter. No database assumed on shared cPanel.
 * Self-prunes on every access since a cron job isn't guaranteed either.
 *
 * @return bool true if the request is allowed, false if the caller is over the limit
 */
function checkRateLimit(string $ip): bool
{
    $dir = __DIR__ . '/data/ratelimit';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }

    $file = $dir . '/' . md5($ip) . '.json';
    $now = time();
    $isNewFile = !file_exists($file);

    $handle = fopen($file, 'c+');
    if ($handle === false) {
        // If the rate-limit store itself is unwritable, fail open rather
        // than blocking legitimate enquiries over an infra issue.
        return true;
    }

    if ($isNewFile) {
        @chmod($file, 0600);
    }

    flock($handle, LOCK_EX);

    $raw = stream_get_contents($handle);
    $timestamps = [];
    if ($raw !== false && $raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $timestamps = $decoded;
        }
    }

    // Prune anything outside the rolling window.
    $timestamps = array_values(array_filter(
        $timestamps,
        fn($ts) => is_int($ts) && ($now - $ts) < RATE_LIMIT_WINDOW_SECONDS
    ));

    $allowed = count($timestamps) < RATE_LIMIT_MAX_PER_HOUR;

    if ($allowed) {
        $timestamps[] = $now;
    }

    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($timestamps));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    return $allowed;
}

/**
 * Verifies a reCAPTCHA v3 token server-side. Prefers curl (available on
 * almost all cPanel PHP builds); falls back to file_get_contents with a
 * stream context for hosts without the curl extension enabled.
 */
function verifyRecaptcha(string $secret, ?string $token): bool
{
    // No secret configured yet (pre-launch: keys haven't been generated at
    // google.com/recaptcha). Skip verification rather than rejecting every
    // submission outright, so the form still works end to end during setup
    // — this bypass naturally disappears the moment a real secret is set.
    if ($secret === '') {
        logError('reCAPTCHA secret not configured — skipping verification (fix before launch).');
        return true;
    }

    if (!$token) {
        return false;
    }

    $params = [
        'secret' => $secret,
        'response' => $token,
        'remoteip' => clientIp(),
    ];

    $result = false;

    if (function_exists('curl_init')) {
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($params),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);
        $response = curl_exec($ch);
        if ($response === false) {
            logError('curl siteverify failed: ' . curl_error($ch));
        }
        curl_close($ch);
        $result = $response;
    }

    if ($result === false) {
        // Fallback for shared hosts without the curl extension.
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => http_build_query($params),
                'timeout' => 10,
            ],
        ]);
        $result = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
    }

    if ($result === false || $result === null) {
        return false;
    }

    $decoded = json_decode($result, true);
    if (!is_array($decoded)) {
        return false;
    }

    return ($decoded['success'] ?? false) === true
        && (float) ($decoded['score'] ?? 0) >= 0.5
        && ($decoded['action'] ?? '') === 'contact';
}

function buildSubject(string $safeName): string
{
    $base = 'New enquiry from rbixtechnologies.com';
    return $safeName !== '' ? "{$base} — {$safeName}" : $base;
}

function buildBody(array $fields): string
{
    return implode("\n", [
        'New contact form submission',
        '',
        "Name: {$fields['name']}",
        "Company: {$fields['company']}",
        "Email: {$fields['email']}",
        "Phone: {$fields['phone']}",
        "Interest: {$fields['interest']}",
        '',
        'Message:',
        $fields['message'],
        '',
        '---',
        'IP: ' . clientIp(),
        'Submitted: ' . date('c'),
    ]);
}

function sendViaSmtp(
    array $config,
    string $to,
    string $from,
    string $fromName,
    string $replyTo,
    string $subject,
    string $body
): bool {
    try {
        $mailer = new SmtpMailer(
            (string) $config['SMTP_HOST'],
            (int) ($config['SMTP_PORT'] ?: 587),
            (string) ($config['SMTP_USER'] ?? ''),
            (string) ($config['SMTP_PASS'] ?? '')
        );
        $mailer->send($to, $from, $fromName, $replyTo, $subject, $body);
        return true;
    } catch (Throwable $e) {
        logError('SMTP send failed: ' . $e->getMessage());
        return false;
    }
}

function sendViaMail(string $to, string $from, string $fromName, string $replyTo, string $subject, string $body): bool
{
    $headers = "From: {$fromName} <{$from}>\r\n" .
        "Reply-To: <{$replyTo}>\r\n" .
        'Content-Type: text/plain; charset=UTF-8';

    $sent = @mail($to, $subject, $body, $headers);
    if (!$sent) {
        logError('mail() returned false');
    }
    return $sent;
}

// ── Main ──────────────────────────────────────────────────────────

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respond(405, ['ok' => false]);
    }

    $raw = file_get_contents('php://input');
    $input = json_decode($raw ?: '', true);
    if (!is_array($input)) {
        $input = [];
    }

    $fields = [
        'name' => trim((string) ($input['name'] ?? '')),
        'company' => trim((string) ($input['company'] ?? '')),
        'email' => trim((string) ($input['email'] ?? '')),
        'phone' => trim((string) ($input['phone'] ?? '')),
        'interest' => trim((string) ($input['interest'] ?? '')),
        'message' => trim((string) ($input['message'] ?? '')),
        'hp_field' => trim((string) ($input['hp_field'] ?? '')),
    ];
    $recaptchaToken = isset($input['recaptchaToken']) ? (string) $input['recaptchaToken'] : null;

    // Honeypot: silently pretend success, never reveal the trap to a bot.
    // No mail is sent and the rate limiter is not touched.
    if ($fields['hp_field'] !== '') {
        respond(200, ['ok' => true]);
    }

    $errors = [];
    if ($fields['name'] === '') {
        $errors['name'] = 'Please enter your name.';
    }
    if ($fields['email'] === '' || !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "That doesn't look like a valid email address.";
    }
    if ($fields['message'] === '') {
        $errors['message'] = 'Please include a short message.';
    }

    if (!empty($errors)) {
        respond(422, ['ok' => false, 'errors' => $errors]);
    }

    $config = loadConfig();
    if ($config === null) {
        respond(500, ['ok' => false, 'errors' => ['server' => 'Contact form is not configured yet.']]);
    }

    if (!verifyRecaptcha((string) ($config['RECAPTCHA_SECRET_KEY'] ?? ''), $recaptchaToken)) {
        respond(400, ['ok' => false, 'errors' => ['recaptcha' => 'Verification failed, please try again.']]);
    }

    if (!checkRateLimit(clientIp())) {
        respond(429, ['ok' => false, 'errors' => ['rate' => 'Too many requests — please try again later.']]);
    }

    // Sanitize anything that ends up near a mail header. The message body
    // itself is not header-bound, so it keeps its line breaks untouched.
    $safeName = sanitizeHeaderValue($fields['name']);
    $safeEmail = sanitizeHeaderValue($fields['email']);
    $safeInterest = sanitizeHeaderValue($fields['interest']);
    $safePhone = sanitizeHeaderValue($fields['phone']);

    $bodyFields = $fields;
    $bodyFields['name'] = $safeName;
    $bodyFields['email'] = $safeEmail;
    $bodyFields['interest'] = $safeInterest;
    $bodyFields['phone'] = $safePhone;

    $subject = buildSubject($safeName);
    $body = buildBody($bodyFields);

    $to = (string) ($config['MAIL_TO'] ?: 'info@rbixtechnologies.com');
    $from = (string) ($config['MAIL_FROM'] ?: 'no-reply@rbixtechnologies.com');
    $fromName = (string) ($config['MAIL_FROM_NAME'] ?? 'RBiX Technologies Website');
    $replyTo = $safeEmail;

    $sent = !empty($config['SMTP_HOST'])
        ? sendViaSmtp($config, $to, $from, $fromName, $replyTo, $subject, $body)
        : sendViaMail($to, $from, $fromName, $replyTo, $subject, $body);

    if (!$sent) {
        respond(500, ['ok' => false, 'errors' => ['server' => "We couldn't send that. Please try again, or email us directly."]]);
    }

    respond(200, ['ok' => true]);
} catch (Throwable $e) {
    logError('Unhandled exception: ' . $e->getMessage());
    respond(500, ['ok' => false, 'errors' => ['server' => 'Something went wrong. Please try again, or email us directly.']]);
}
