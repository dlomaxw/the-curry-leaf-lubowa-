import Link from "next/link";
import BarItemForm from "../BarItemForm";
import { createBarItem } from "../actions";

export default function NewBarItemPage() {
  return (
    <div>
      <Link
        href="/admin/bar-menu"
        className="text-xs font-semibold uppercase tracking-wider text-cocoa/50 hover:text-cocoa"
      >
        ← Back to Bar Menu
      </Link>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-leaf-deep">
        Add Bar Item
      </h1>
      <div className="mt-6 rounded-2xl bg-cream p-6 shadow-sm shadow-sand/40">
        <BarItemForm action={createBarItem} submitLabel="Create Item" />
      </div>
    </div>
  );
}
