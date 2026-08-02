import Link from "next/link";
import BreakfastItemForm from "../BreakfastItemForm";
import { createBreakfastItem } from "../actions";

export default function NewBreakfastItemPage() {
  return (
    <div>
      <Link
        href="/admin/breakfast-menu"
        className="text-xs font-semibold uppercase tracking-wider text-cocoa/50 hover:text-cocoa"
      >
        ← Back to Breakfast Menu
      </Link>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-leaf-deep">
        Add Breakfast Item
      </h1>
      <div className="mt-6 rounded-2xl bg-cream p-6 shadow-sm shadow-sand/40">
        <BreakfastItemForm action={createBreakfastItem} submitLabel="Create Item" />
      </div>
    </div>
  );
}
