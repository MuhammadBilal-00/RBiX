// STAGING ONLY — mirrors php/contact-handler.php's contract without real mail delivery. Delete this file once the site cuts over to cPanel/PHP.
//
// This is NOT part of the Next.js app (it lives at repo-root /api/, outside
// app/), because with `output: 'export'` in next.config.js, Next.js Route
// Handlers can't run dynamic POST logic in static export mode. Vercel
// auto-detects any /api/*.js file as a serverless function regardless of
// the Next.js static export happening in the same deployment, so this runs
// fine alongside the exported site.
//
// Purpose: let the full reCAPTCHA v3 + contact form UX be demoed end-to-end
// on Vercel staging before cPanel/PHP exists. Mirrors contact-handler.php's
// validation/honeypot/reCAPTCHA request-response contract, but:
//   - does NOT send real mail — just console.logs the validated submission
//   - rate limiting is in-memory only (Vercel functions have no persistent
//     filesystem/cold starts reset it) — the real limiter lives in
//     php/contact-handler.php
//
// Configure in the Vercel project's Environment Variables:
//   RECAPTCHA_SECRET_KEY — the reCAPTCHA v3 secret key (server-side only)
// Point NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact at this on Vercel staging.

const RATE_LIMIT_MAX_PER_HOUR = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// Best-effort only — serverless instances are ephemeral/parallel, so this
// is not a real production limiter, just enough to demo the behavior.
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  const allowed = timestamps.length < RATE_LIMIT_MAX_PER_HOUR;
  if (allowed) {
    timestamps.push(now);
  }
  rateLimitStore.set(ip, timestamps);
  return allowed;
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "0.0.0.0";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyRecaptcha(secret, token, remoteip) {
  // No secret configured yet on this Vercel project — skip verification
  // rather than rejecting every staging submission (matches the same
  // graceful-degradation behavior as php/contact-handler.php).
  if (!secret) {
    console.warn("RECAPTCHA_SECRET_KEY not set — skipping verification (fix before launch).");
    return true;
  }
  if (!token) return false;

  try {
    const params = new URLSearchParams({ secret, response: token, remoteip });
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = await res.json();
    return data.success === true && (data.score ?? 0) >= 0.5 && data.action === "contact";
  } catch (err) {
    console.error("recaptcha siteverify failed:", err);
    return false;
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  const fields = {
    name: String(body.name || "").trim(),
    company: String(body.company || "").trim(),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    interest: String(body.interest || "").trim(),
    message: String(body.message || "").trim(),
    hp_field: String(body.hp_field || "").trim(),
  };
  const recaptchaToken = body.recaptchaToken ? String(body.recaptchaToken) : null;

  // Honeypot — silently pretend success, never reveal the trap to a bot.
  if (fields.hp_field !== "") {
    res.status(200).json({ ok: true });
    return;
  }

  const errors = {};
  if (fields.name === "") errors.name = "Please enter your name.";
  if (fields.email === "" || !isValidEmail(fields.email)) {
    errors.email = "That doesn't look like a valid email address.";
  }
  if (fields.message === "") errors.message = "Please include a short message.";

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ ok: false, errors });
    return;
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY || "";
  const ip = clientIp(req);

  const recaptchaOk = await verifyRecaptcha(secret, recaptchaToken, ip);
  if (!recaptchaOk) {
    res.status(400).json({ ok: false, errors: { recaptcha: "Verification failed, please try again." } });
    return;
  }

  if (!checkRateLimit(ip)) {
    res.status(429).json({ ok: false, errors: { rate: "Too many requests — please try again later." } });
    return;
  }

  // Staging shim: no real mail delivery, just log so the team can verify
  // the end-to-end UX (validation, reCAPTCHA, success state) works.
  console.log("[staging contact submission]", { ...fields, ip, submittedAt: new Date().toISOString() });

  res.status(200).json({ ok: true });
};
