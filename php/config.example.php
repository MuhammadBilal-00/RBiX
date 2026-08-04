<?php
/**
 * Copy this file to config.php (gitignored — never commit real secrets)
 * and fill in real values before deploying to cPanel.
 *
 * NEXT_PUBLIC_CONTACT_ENDPOINT (see .env.local.example at the repo root)
 * must point at this handler's deployed path — normally the default
 * "/php/contact-handler.php" is correct and no override is needed. On
 * Vercel staging, where PHP can't run, set NEXT_PUBLIC_CONTACT_ENDPOINT to
 * "/api/contact" instead, which routes to the api/contact.js serverless
 * shim (staging-only, no real mail delivery).
 */
return [
    // From https://www.google.com/recaptcha/admin (reCAPTCHA v3, NOT v2)
    // for the real domain. While this is empty, contact-handler.php SKIPS
    // reCAPTCHA verification (logged as a warning) so the form still works
    // during setup — this is a pre-launch checklist item, not optional:
    // fill this in before going live, since it's the only thing standing
    // between the form and bot submissions.
    'RECAPTCHA_SECRET_KEY' => '',

    // Where enquiry emails are delivered.
    'MAIL_TO' => 'info@rbixtechnologies.com',

    // Must be a same-domain address, NOT the visitor's email — using the
    // visitor's address as the From (rather than Reply-To) fails SPF/DKIM
    // checks on most mail providers and gets the message spam-flagged or
    // rejected outright.
    'MAIL_FROM' => 'no-reply@rbixtechnologies.com',
    'MAIL_FROM_NAME' => 'RBiX Technologies Website',

    // Leave SMTP_HOST empty to fall back to PHP's built-in mail() function.
    // Using real SMTP is strongly recommended on shared cPanel hosting —
    // mail() is commonly spam-flagged and gives no delivery feedback.
    // Setting SMTP_HOST switches contact-handler.php onto php/lib/SmtpMailer.php
    // (a small original SMTP client written for this project) instead of mail().
    // Only STARTTLS is supported (the standard submission port, 587) — use
    // your provider's STARTTLS host/port, not an implicit-TLS/465 endpoint.
    'SMTP_HOST' => '',
    'SMTP_PORT' => 587,
    'SMTP_USER' => '',
    'SMTP_PASS' => '',
];
