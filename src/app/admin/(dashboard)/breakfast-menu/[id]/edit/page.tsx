import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { BreakfastChoice } from "@/data/breakfast";
import BreakfastItemForm from "../../BreakfastItemForm";
import { updateBreakfastItem } from "../../actions";

export default async function EditBreakfastItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.breakfastItem.findUnique({ where: { id } });
  if (!item) notFound();

  const boundAction = updateBreakfastItem.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/breakfast-menu"
        className="text-xs font-semibold uppercase tracking-wider text-cocoa/50 hover:text-cocoa"
      >
        ← Back to Breakfast Menu
      </Link>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-leaf-deep">
        Edit {item.name}
      </h1>
      <div className="mt-6 rounded-2xl bg-cream p-6 shadow-sm shadow-sand/40">
        <BreakfastItemForm
          action={boundAction}
          submitLabel="Save Changes"
          initial={{
            name: item.name,
            category: item.category,
            price: item.price,
            priceMax: item.priceMax,
            description: item.description,
            includes: item.includes,
            choices: (item.choices as BreakfastChoice[] | null) ?? null,
            available: item.available,
          }}
        />
      </div>
    </div>
  );
}
