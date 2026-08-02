"use client";

import { useFormState, useFormStatus } from "react-dom";
import { changePassword, type ChangePasswordState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-leaf px-7 py-3 text-sm font-semibold text-cream transition-transform enabled:hover:scale-[1.02] disabled:opacity-50"
    >
      {pending ? "Updating…" : "Update Password"}
    </button>
  );
}

export default function ChangePasswordForm() {
  const [state, formAction] = useFormState<ChangePasswordState, FormData>(
    changePassword,
    {},
  );
  const input =
    "w-full rounded-xl border border-sand bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron";
  const label =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/60";

  return (
    <form action={formAction} className="max-w-md space-y-4">
      <div>
        <label htmlFor="currentPassword" className={label}>
          Current Password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className={input}
        />
      </div>
      <div>
        <label htmlFor="newPassword" className={label}>
          New Password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={input}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className={label}>
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={input}
        />
      </div>
      {state.error && (
        <p className="rounded-lg bg-chilli/10 px-4 py-2 text-sm text-chilli">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-lg bg-leaf/10 px-4 py-2 text-sm text-leaf">
          {state.success}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
