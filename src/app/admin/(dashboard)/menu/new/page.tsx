import Link from "next/link";
import MenuItemForm from "../MenuItemForm";
import { createMenuItem } from "../actions";

export default function NewMenuItemPage() {
  return (
    <div>
      <Link
        href="/admin/menu"
        className="text-xs font-semibold uppercase tracking-wider text-cocoa/50 hover:text-cocoa"
      >
        ← Back to Menu
      </Link>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-leaf-deep">
        Add Dish
      </h1>
      <div className="mt-6 rounded-2xl bg-cream p-6 shadow-sm shadow-sand/40">
        <MenuItemForm action={createMenuItem} submitLabel="Create Dish" />
      </div>
    </div>
  );
}
