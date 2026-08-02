import Link from "next/link";
import { getAllBreakfastItems } from "@/lib/data/breakfast";
import { breakfastCategories } from "@/data/breakfast";
import { formatUGX } from "@/data/menu";
import { toggleBreakfastAvailability, deleteBreakfastItem } from "./actions";
import ToggleAvailabilityButton from "@/components/admin/ToggleAvailabilityButton";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBreakfastMenuPage() {
  const items = await getAllBreakfastItems();

  const grouped = breakfastCategories
    .map((c) => ({ ...c, items: items.filter((i) => i.category === c.id) }))
    .filter((c) => c.items.length > 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-leaf-deep">
            Breakfast Menu
          </h1>
          <p className="mt-1 text-sm text-cocoa/60">
            {items.length} items across {grouped.length} categories.
          </p>
        </div>
        <Link
          href="/admin/breakfast-menu/new"
          className="rounded-full bg-saffron px-6 py-2.5 text-sm font-semibold text-cocoa transition-transform hover:scale-105"
        >
          + Add Item
        </Link>
      </div>

      {grouped.map((group) => (
        <section key={group.id} className="mt-8">
          <h2 className="font-serif text-xl font-semibold text-cocoa">
            {group.label}
          </h2>
          <div className="mt-3 overflow-hidden rounded-2xl bg-cream shadow-sm shadow-sand/40">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sand/60 text-xs uppercase tracking-wider text-cocoa/50">
                  <th className="px-5 py-3 font-semibold">Item</th>
                  <th className="px-5 py-3 font-semibold">Price</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/40">
                {group.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-3 font-medium text-cocoa">
                      {item.name}
                    </td>
                    <td className="px-5 py-3 text-cocoa/70">
                      {formatUGX(item.price)}
                      {item.priceMax ? ` – ${formatUGX(item.priceMax)}` : ""}
                    </td>
                    <td className="px-5 py-3">
                      <ToggleAvailabilityButton
                        available={item.available}
                        onToggle={toggleBreakfastAvailability.bind(null, item.id)}
                      />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/breakfast-menu/${item.id}/edit`}
                          className="text-xs font-semibold text-leaf underline underline-offset-2 hover:text-leaf/70"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          confirmText={`Delete "${item.name}"? This can't be undone.`}
                          onDelete={deleteBreakfastItem.bind(null, item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
