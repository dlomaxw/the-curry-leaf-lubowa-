"use client";

import { useFormState, useFormStatus } from "react-dom";
import { categories } from "@/data/menu";
import type { MenuFormState } from "./actions";
import DishImageField from "./DishImageField";

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

export interface MenuItemFormValues {
  name: string;
  category: string;
  price: number;
  priceMax: number | null;
  description: string;
  dietary: string;
  spice: number;
  featured: boolean;
  accent: string | null;
  image: string | null;
  containsNuts: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  available: boolean;
}

export default function MenuItemForm({
  action,
  initial,
  submitLabel,
}: {
  action: (state: MenuFormState, formData: FormData) => Promise<MenuFormState>;
  initial?: MenuItemFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useFormState<MenuFormState, FormData>(action, {});
  const input =
    "w-full rounded-xl border border-sand bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron";
  const label =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/60";
  const checkboxRow = "flex items-center gap-2 text-sm text-cocoa/80";

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>
          Dish Name
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
          defaultValue={initial?.category ?? categories[0].id}
          className={input}
        >
          {categories.map((c) => (
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
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={initial?.description}
          className={input}
        />
      </div>

      <div>
        <label htmlFor="dietary" className={label}>
          Dietary
        </label>
        <select
          id="dietary"
          name="dietary"
          defaultValue={initial?.dietary ?? "VEG"}
          className={input}
        >
          <option value="VEG">Vegetarian</option>
          <option value="VEGAN">Vegan</option>
          <option value="NON_VEG">Non-Vegetarian</option>
        </select>
      </div>
      <div>
        <label htmlFor="spice" className={label}>
          Spice Level (0–3)
        </label>
        <select
          id="spice"
          name="spice"
          defaultValue={String(initial?.spice ?? 0)}
          className={input}
        >
          <option value="0">No heat</option>
          <option value="1">Mild</option>
          <option value="2">Medium</option>
          <option value="3">Hot</option>
        </select>
      </div>

      <div>
        <label htmlFor="accent" className={label}>
          Accent Colour (hex, optional)
        </label>
        <input
          id="accent"
          name="accent"
          defaultValue={initial?.accent ?? ""}
          placeholder="#C99528"
          className={input}
        />
      </div>
      <DishImageField initialValue={initial?.image ?? ""} />

      <div className="flex flex-wrap gap-5 sm:col-span-2">
        <label className={checkboxRow}>
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initial?.featured ?? false}
          />
          Featured on homepage
        </label>
        <label className={checkboxRow}>
          <input
            type="checkbox"
            name="available"
            defaultChecked={initial?.available ?? true}
          />
          Available
        </label>
        <label className={checkboxRow}>
          <input
            type="checkbox"
            name="containsNuts"
            defaultChecked={initial?.containsNuts ?? false}
          />
          Contains nuts
        </label>
        <label className={checkboxRow}>
          <input
            type="checkbox"
            name="glutenFree"
            defaultChecked={initial?.glutenFree ?? false}
          />
          Gluten-free
        </label>
        <label className={checkboxRow}>
          <input
            type="checkbox"
            name="dairyFree"
            defaultChecked={initial?.dairyFree ?? false}
          />
          Dairy-free
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
