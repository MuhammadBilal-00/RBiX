"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Script from "next/script";
import { contactInfo, servicesNav } from "@/data/nav";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
// On Vercel staging there is no PHP runtime, so the form endpoint is
// overridden (via .env.local) to the /api/contact serverless shim. On the
// real cPanel deploy this resolves to the PHP handler shipped alongside out/.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/php/contact-handler.php";

const GENERIC_ERROR_MESSAGE = `Something went wrong — please try again, or email us directly at ${contactInfo.email}.`;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  hp_field: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
  hp_field: "",
};

// Keys the server may echo back as field-level errors — anything else
// (e.g. "recaptcha", "rate", "server") is surfaced only via the generic banner.
const FIELD_KEYS: (keyof FormState)[] = ["name", "company", "email", "phone", "interest", "message"];

type FieldErrors = Partial<Record<keyof FormState, string>>;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const successRef = useRef<HTMLDivElement | null>(null);

  // The form is replaced by the success panel on submit; without moving
  // focus there, screen-reader and keyboard users are left on a control
  // that no longer exists.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "That doesn't look like a valid email address.";
    }
    if (!form.message.trim()) next.message = "Tell us a little about the workflow costing you time.";
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");

    if (SITE_KEY && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window
          .grecaptcha!.execute(SITE_KEY, { action: "contact" })
          .then((token) => submit(token))
          .catch(() => submit(undefined));
      });
    } else {
      if (!SITE_KEY) {
        console.warn(
          "NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set — submitting without a reCAPTCHA token. Set this before launch."
        );
      }
      await submit(undefined);
    }
  }

  async function submit(recaptchaToken: string | undefined) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        setForm(initialState);
        setStatus("success");
        return;
      }

      applyServerErrors(data?.errors);
      setStatus("error");
    } catch {
      applyServerErrors(undefined);
      setStatus("error");
    }
  }

  function applyServerErrors(serverErrors: Record<string, string> | undefined) {
    if (!serverErrors) {
      setErrors({});
      return;
    }
    const next: FieldErrors = {};
    for (const key of FIELD_KEYS) {
      if (serverErrors[key]) next[key] = serverErrors[key];
    }
    setErrors(next);
  }

  return (
    <div>
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      {status === "success" && (
        <div className="contact-success" ref={successRef} tabIndex={-1}>
          <strong>Thanks — message received.</strong>
          <span>We read every enquiry personally and reply within one business day.</span>
        </div>
      )}

      {status === "error" && (
        <div className="contact-error" role="alert">
          {GENERIC_ERROR_MESSAGE}
        </div>
      )}

      {status !== "success" && (
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__row">
            <div className={`field${errors.name ? " field--error" : ""}`}>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jordan Smith"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <span className="field__error" id="name-error">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Your business name"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />
            </div>
          </div>

          <div className="form__row">
            <div className={`field${errors.email ? " field--error" : ""}`}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <span className="field__error" id="email-error">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+44 7737 641862"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="interest">What are you interested in?</label>
            <select
              id="interest"
              name="interest"
              value={form.interest}
              onChange={(e) => update("interest", e.target.value)}
            >
              <option value="">Not sure yet…</option>
              {servicesNav.map((s) => (
                <option key={s.href} value={s.label}>
                  {s.label}
                </option>
              ))}
              <option value="Not sure / general enquiry">Something else</option>
            </select>
          </div>

          <div className={`field${errors.message ? " field--error" : ""}`}>
            <label htmlFor="message">Tell us about the workflow costing you the most</label>
            <textarea
              id="message"
              name="message"
              placeholder="e.g. Leads sit unanswered overnight, our no-show rate is high, invoices go unpaid for weeks…"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && <span className="field__error" id="message-error">{errors.message}</span>}
          </div>

          {/* Honeypot — visually hidden via .hp-field (off-screen, not display:none)
              so bots that only skip display:none fields still get caught. */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="hp_field">Leave this field empty</label>
            <input
              id="hp_field"
              name="hp_field"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.hp_field}
              onChange={(e) => update("hp_field", e.target.value)}
            />
          </div>

          <button className="btn btn--red form__submit" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send Message"}
            <span className="btn__ic" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="11" height="11">
                <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </button>

          <p className="form__note">
            Prefer email? Write to us directly at{" "}
            <a href={`mailto:${contactInfo.email}?subject=Enquiry%20from%20website`}>{contactInfo.email}</a>.
          </p>
        </form>
      )}
    </div>
  );
}
