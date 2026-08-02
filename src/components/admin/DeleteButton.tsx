"use client";

import { useTransition } from "react";

export default function DeleteButton({
  confirmText,
  onDelete,
}: {
  confirmText: string;
  onDelete: () => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm(confirmText)) startTransition(() => onDelete());
      }}
      disabled={pending}
      className="text-xs font-semibold text-chilli underline underline-offset-2 hover:text-chilli/70 disabled:opacity-50"
    >
      {pending ? "Removing…" : "Delete"}
    </button>
  );
}
