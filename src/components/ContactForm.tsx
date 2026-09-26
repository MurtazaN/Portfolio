"use client";
import { useState } from "react";

const RECIPIENT = "murtaza.nipplewala@gmail.com";
// Public by design: a Web3Forms key only routes submissions to the owner's inbox.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const labelClass = "mb-2 block text-xs font-semibold tracking-widest text-accent uppercase";
const fieldClass =
  "w-full rounded-lg border border-white/10 bg-[#030712] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-accent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!WEB3FORMS_KEY) {
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
        String(data.get("subject")),
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus({ kind: "sending" });
    data.append("access_key", WEB3FORMS_KEY);
    data.append("from_name", "Portfolio contact form");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await response.json();
      if (json.success) {
        form.reset();
        setStatus({ kind: "sent", message: "Thanks! Your message is on its way." });
      } else {
        setStatus({ kind: "error", message: json.message ?? "Something went wrong." });
      }
    } catch {
      setStatus({
        kind: "error",
        message: `Couldn't send right now. Please email ${RECIPIENT} directly.`,
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-surface p-8 lg:p-10"
    >
      <h2 className="mb-8 text-2xl font-bold text-white">Send a Message</h2>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>Subject</label>
          <input id="subject" name="subject" type="text" required placeholder="Subject" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>Message</label>
          <textarea id="message" name="message" required rows={6} placeholder="What's on your mind?" className={`${fieldClass} resize-y`} />
        </div>
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="mt-8 w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {status.kind === "sending" ? "Sending…" : "Send Message"}
      </button>

      <p
        role="status"
        className={`mt-4 min-h-5 text-sm ${status.kind === "error" ? "text-red-400" : "text-accent"}`}
      >
        {status.message}
      </p>
    </form>
  );
}
