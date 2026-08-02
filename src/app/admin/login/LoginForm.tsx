"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-saffron py-3.5 font-semibold text-cocoa transition-transform enabled:hover:scale-[1.02] disabled:opacity-50"
    >
      {pending ? "Signing in…" : "Sign In"}
    </button>
  );
}

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction] = useFormState<LoginState, FormData>(login, {});
  const input =
    "w-full rounded-xl border border-sand bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron";
  const label =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/60";

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className={input}
          placeholder="you@thecurryleaf.ug"
        />
      </div>
      <div>
        <label htmlFor="password" className={label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={input}
          placeholder="••••••••"
        />
      </div>
      {state.error && (
        <p className="rounded-lg bg-chilli/10 px-4 py-2 text-sm text-chilli">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
