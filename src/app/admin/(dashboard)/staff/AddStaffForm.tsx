"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addStaff, type AddStaffState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-leaf px-7 py-3 text-sm font-semibold text-cream transition-transform enabled:hover:scale-[1.02] disabled:opacity-50"
    >
      {pending ? "Creating…" : "Create Account"}
    </button>
  );
}

export default function AddStaffForm() {
  const [state, formAction] = useFormState<AddStaffState, FormData>(
    addStaff,
    {},
  );
  const input =
    "w-full rounded-xl border border-sand bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron";
  const label =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/60";

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>
          Full Name
        </label>
        <input id="name" name="name" required className={input} />
      </div>
      <div>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={input}
        />
      </div>
      <div>
        <label htmlFor="password" className={label}>
          Temporary Password
        </label>
        <input
          id="password"
          name="password"
          type="text"
          required
          minLength={8}
          className={input}
          placeholder="At least 8 characters"
        />
      </div>
      <div>
        <label htmlFor="role" className={label}>
          Role
        </label>
        <select id="role" name="role" defaultValue="STAFF" className={input}>
          <option value="STAFF">Staff</option>
          <option value="MANAGER">Manager</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      {state.error && (
        <p className="rounded-lg bg-chilli/10 px-4 py-2 text-sm text-chilli sm:col-span-2">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-lg bg-leaf/10 px-4 py-2 text-sm text-leaf sm:col-span-2">
          {state.success}
        </p>
      )}
      <div className="sm:col-span-2">
        <SubmitButton />
      </div>
    </form>
  );
}
