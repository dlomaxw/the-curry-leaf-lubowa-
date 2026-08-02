"use client";

import { useTransition } from "react";
import { removeStaff } from "@/app/admin/(dashboard)/staff/actions";

export default function RemoveStaffButton({ userId, name }: { userId: string; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm(`Remove ${name}'s account? This can't be undone.`)) {
          startTransition(() => removeStaff(userId));
        }
      }}
      disabled={pending}
      className="text-xs font-semibold text-chilli underline underline-offset-2 hover:text-chilli/70 disabled:opacity-50"
    >
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}
