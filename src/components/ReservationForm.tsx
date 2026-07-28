"use client";

import { useState } from "react";
import { whatsappLink } from "@/data/site";

const occasions = [
  "Standard table",
  "Romantic dinner",
  "Family dining",
  "Birthday celebration",
  "Corporate dining",
  "Private dining",
  "Large group",
  "Sunday Grand Buffet",
];

export default function ReservationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    occasion: occasions[0],
    notes: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = [
      "Hello The Curry Leaf! I'd like to reserve a table.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Guests: ${form.guests}`,
      `Date: ${form.date}`,
      `Time: ${form.time}`,
      `Occasion: ${form.occasion}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(msg), "_blank");
    setSent(true);
  }

  const input =
    "w-full rounded-xl border border-sand bg-cream px-4 py-3 text-sm outline-none focus:border-saffron";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/60";

  return (
    <form onSubmit={submit} className="rounded-3xl bg-cream p-6 shadow-lg shadow-sand/40 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="r-name" className={label}>Full name</label>
          <input id="r-name" required value={form.name} onChange={set("name")} className={input} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="r-phone" className={label}>Phone number</label>
          <input id="r-phone" required type="tel" value={form.phone} onChange={set("phone")} className={input} placeholder="+256 7xx xxx xxx" />
        </div>
        <div>
          <label htmlFor="r-guests" className={label}>Number of guests</label>
          <input id="r-guests" required type="number" min={1} max={60} value={form.guests} onChange={set("guests")} className={input} />
        </div>
        <div>
          <label htmlFor="r-occasion" className={label}>Occasion</label>
          <select id="r-occasion" value={form.occasion} onChange={set("occasion")} className={input}>
            {occasions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="r-date" className={label}>Date</label>
          <input id="r-date" required type="date" value={form.date} onChange={set("date")} className={input} />
        </div>
        <div>
          <label htmlFor="r-time" className={label}>Time</label>
          <input id="r-time" required type="time" value={form.time} onChange={set("time")} className={input} />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="r-notes" className={label}>Dietary requirements or special requests</label>
        <textarea id="r-notes" rows={3} value={form.notes} onChange={set("notes")} className={input} placeholder="Allergies, celebration details, seating preference…" />
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-leaf py-4 font-semibold text-cream transition-transform hover:scale-[1.02] sm:w-auto sm:px-10"
      >
        Send Reservation via WhatsApp
      </button>
      {sent && (
        <p className="mt-4 text-sm text-leaf">
          WhatsApp should have opened with your reservation details — just press
          send. We&apos;ll confirm shortly.
        </p>
      )}
      <p className="mt-4 text-xs text-cocoa/50">
        Your reservation opens in WhatsApp so you can send it directly to our
        team — no account needed.
      </p>
    </form>
  );
}
