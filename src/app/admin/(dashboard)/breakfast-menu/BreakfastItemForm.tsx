"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { breakfastCategories } from "@/data/breakfast";
import type { BreakfastFormState } from "./actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-leaf px-7 py-3 text-sm font-semibold text-cream transition-transform enabled:hover:scale-[1.02] disabled:opacity-50"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

interface ChoiceRow {
  label: string;
  optionsText: string;
}

export interface BreakfastItemFormValues {
  name: string;
  category: string;
  price: number;
  priceMax: number | null;
  description: string | null;
  includes: string[];
  choices: { label: string; options: string[] }[] | null;
  available: boolean;
}

export default function BreakfastItemForm({
  action,
  initial,
  submitLabel,
}: {
  action: (
    state: BreakfastFormState,
    formData: FormData,
  ) => Promise<BreakfastFormState>;
  initial?: BreakfastItemFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useFormState<BreakfastFormState, FormData>(
    action,
    {},
  );
  const [choices, setChoices] = useState<ChoiceRow[]>(
    initial?.choices?.map((c) => ({
      label: c.label,
      optionsText: c.options.join(", "),
    })) ?? [],
  );

  const choicesJson = JSON.stringify(
    choices
      .filter((c) => c.label.trim())
      .map((c) => ({
        label: c.label.trim(),
        options: c.optionsText
          .split(",")
          .map((o) => o.trim())
          .filter(Boolean),
      }))
      .filter((c) => c.options.length > 0),
  );

  const input =
    "w-full rounded-xl border border-sand bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron";
  const label =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/60";

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="choicesJson" value={choicesJson} />

      <div>
        <label htmlFor="name" className={label}>
          Item Name
        </label>
        <input id="name" name="name" required defaultValue={initial?.name} className={input} />
      </div>
      <div>
        <label htmlFor="category" className={label}>
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={initial?.category ?? breakfastCategories[0].id}
          className={input}
        >
          {breakfastCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="price" className={label}>
          Price (UGX)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min={0}
          required
          defaultValue={initial?.price}
          className={input}
        />
      </div>
      <div>
        <label htmlFor="priceMax" className={label}>
          Max Price (optional — for price ranges)
        </label>
        <input
          id="priceMax"
          name="priceMax"
          type="number"
          min={0}
          defaultValue={initial?.priceMax ?? ""}
          className={input}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="description" className={label}>
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={initial?.description ?? ""}
          className={input}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="includes" className={label}>
          Includes (one per line, optional)
        </label>
        <textarea
          id="includes"
          name="includes"
          rows={3}
          defaultValue={initial?.includes.join("\n")}
          placeholder={"Eggs\nSausages\nToast"}
          className={input}
        />
      </div>

      <div className="sm:col-span-2">
        <div className="flex items-center justify-between">
          <span className={label}>
            Combo Choices (e.g. &ldquo;Main&rdquo; or &ldquo;Drink&rdquo; — leave empty for a plain item)
          </span>
          <button
            type="button"
            onClick={() =>
              setChoices((c) => [...c, { label: "", optionsText: "" }])
            }
            className="text-xs font-semibold text-leaf underline underline-offset-2 hover:text-leaf/70"
          >
            + Add Choice Group
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {choices.map((row, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-sand bg-ivory p-3">
              <div className="w-1/3">
                <input
                  value={row.label}
                  onChange={(e) =>
                    setChoices((c) =>
                      c.map((r, ri) => (ri === i ? { ...r, label: e.target.value } : r)),
                    )
                  }
                  placeholder="Main"
                  className="w-full rounded-lg border border-sand bg-cream px-3 py-2 text-sm outline-none focus:border-saffron"
                />
              </div>
              <div className="flex-1">
                <input
                  value={row.optionsText}
                  onChange={(e) =>
                    setChoices((c) =>
                      c.map((r, ri) =>
                        ri === i ? { ...r, optionsText: e.target.value } : r,
                      ),
                    )
                  }
                  placeholder="Rolex, Bombay Rolex, Bacon Bap"
                  className="w-full rounded-lg border border-sand bg-cream px-3 py-2 text-sm outline-none focus:border-saffron"
                />
              </div>
              <button
                type="button"
                onClick={() => setChoices((c) => c.filter((_, ri) => ri !== i))}
                className="flex-none text-xs font-semibold text-chilli underline underline-offset-2"
              >
                Remove
              </button>
            </div>
          ))}
          {choices.length === 0 && (
            <p className="text-xs text-cocoa/50">
              No choice groups — this is a plain menu item.
            </p>
          )}
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-center gap-2 text-sm text-cocoa/80">
          <input
            type="checkbox"
            name="available"
            defaultChecked={initial?.available ?? true}
          />
          Available
        </label>
      </div>

      {state.error && (
        <p className="rounded-lg bg-chilli/10 px-4 py-2 text-sm text-chilli sm:col-span-2">
          {state.error}
        </p>
      )}

      <div className="sm:col-span-2">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
