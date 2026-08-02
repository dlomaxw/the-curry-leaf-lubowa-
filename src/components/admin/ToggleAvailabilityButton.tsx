"use client";

import { useTransition } from "react";

export default function ToggleAvailabilityButton({
  available,
  onToggle,
}: {
  available: boolean;
  onToggle: (next: boolean) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => onToggle(!available))}
      disabled={pending}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors disabled:opacity-50 ${
        available
          ? "bg-leaf/15 text-leaf hover:bg-leaf/25"
          : "bg-chilli/10 text-chilli hover:bg-chilli/20"
      }`}
    >
      {available ? "Available" : "Unavailable"}
    </button>
  );
}
