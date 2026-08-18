"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { barCategories } from "@/data/bar";
import type { BarFormState } from "./actions";
import BarImageField from "./BarImageField";

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

export interface BarItemFormValues {
  name: string;
  category: string;
  subcategory: string | null;
  price: number | null;
  priceLabel: string | null;
  description: string | null;
  image: string | null;
  available: boolean;
}

export default function BarItemForm({
  action,
  initial,
  submitLabel,
}: {
  action: (state: BarFormState, formData: FormData) => Promise<BarFormState>;
  initial?: BarItemFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useFormState<BarFormState, FormData>(action, {});
  const [category, setCategory] = useState(initial?.category ?? barCategories[0].id);

  const input =
    "w-full rounded-xl border border-sand bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron";
  const label =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/60";

  const subcategories =
    barCategories.find((c) => c.id === category)?.subcategories ?? [];

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={input}
        >
          {barCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {subcategories.length > 0 && (
        <div>
          <label htmlFor="subcategory" className={label}>
            Subcategory
          </label>
          <select
            id="subcategory"
            name="subcategory"
            defaultValue={initial?.subcategory ?? subcategories[0].label}
            className={input}
          >
            {subcategories.map((s) => (
              <option key={s.label} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="price" className={label}>
          Price (UGX) — leave blank if using a price label
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min={0}
          defaultValue={initial?.price ?? ""}
          className={input}
        />
      </div>
      <div>
        <label htmlFor="priceLabel" className={label}>
          Price Label (optional — e.g. &quot;Glass UGX 18,000 · Bottle UGX 95,000&quot;)
        </label>
        <input
          id="priceLabel"
          name="priceLabel"
          defaultValue={initial?.priceLabel ?? ""}
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
          rows={3}
          defaultValue={initial?.description ?? ""}
          className={input}
        />
      </div>

      <BarImageField initialValue={initial?.image ?? ""} />

      <div className="flex flex-wrap gap-5 sm:col-span-2">
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
