"use client";

import { useState } from "react";
import { whatsappLink } from "@/data/site";

export default function EnquiryForm({
  kind,
  extraFieldLabel,
}: {
  kind: string;
  extraFieldLabel: string;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "",
    date: "",
    extra: "",
    requirements: "",
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = [
      `Hello The Curry Leaf! I'd like to enquire about a ${kind} package.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Estimated guests: ${form.guests}`,
      `Preferred date: ${form.date}`,
      form.extra ? `${extraFieldLabel}: ${form.extra}` : "",
      form.requirements ? `Requirements: ${form.requirements}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(msg), "_blank");
  }

  const input =
    "w-full rounded-xl border border-sand bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron";

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
      <input required value={form.name} onChange={set("name")} className={input} placeholder="Your name" aria-label="Your name" />
      <input required type="tel" value={form.phone} onChange={set("phone")} className={input} placeholder="Phone number" aria-label="Phone number" />
      <input required type="number" min={1} value={form.guests} onChange={set("guests")} className={input} placeholder="Estimated guests" aria-label="Estimated guests" />
      <input required type="date" value={form.date} onChange={set("date")} className={input} aria-label="Preferred date" />
      <input value={form.extra} onChange={set("extra")} className={`${input} sm:col-span-2`} placeholder={extraFieldLabel} aria-label={extraFieldLabel} />
      <textarea rows={3} value={form.requirements} onChange={set("requirements")} className={`${input} sm:col-span-2`} placeholder="Dietary needs, budget, special requests…" aria-label="Requirements" />
      <button
        type="submit"
        className="rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 sm:col-span-2 sm:w-fit"
      >
        Request a Proposal via WhatsApp
      </button>
    </form>
  );
}
