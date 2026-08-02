"use client";

import { useTransition } from "react";

const styles: Record<string, string> = {
  RECEIVED: "bg-saffron/15 text-saffron",
  NEW: "bg-saffron/15 text-saffron",
  CONFIRMED: "bg-leaf/15 text-leaf",
  CONTACTED: "bg-leaf/15 text-leaf",
  QUOTED: "bg-leaf/15 text-leaf",
  PREPARING: "bg-leaf/15 text-leaf",
  READY: "bg-leaf/15 text-leaf",
  COMPLETED: "bg-cocoa/10 text-cocoa/60",
  CLOSED: "bg-cocoa/10 text-cocoa/60",
  CANCELLED: "bg-chilli/10 text-chilli",
  NO_SHOW: "bg-chilli/10 text-chilli",
};

export default function StatusSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (next: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => startTransition(() => onChange(e.target.value))}
      className={`rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none disabled:opacity-50 ${
        styles[value] ?? "bg-sand/40 text-cocoa"
      }`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
