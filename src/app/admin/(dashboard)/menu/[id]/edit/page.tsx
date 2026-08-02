import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MenuItemForm from "../../MenuItemForm";
import { updateMenuItem } from "../../actions";

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.menuItem.findUnique({ where: { id } });
  if (!item) notFound();

  const boundAction = updateMenuItem.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/menu"
        className="text-xs font-semibold uppercase tracking-wider text-cocoa/50 hover:text-cocoa"
      >
        ← Back to Menu
      </Link>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-leaf-deep">
        Edit {item.name}
      </h1>
      <div className="mt-6 rounded-2xl bg-cream p-6 shadow-sm shadow-sand/40">
        <MenuItemForm
          action={boundAction}
          submitLabel="Save Changes"
          initial={{
            name: item.name,
            category: item.category,
            price: item.price,
            priceMax: item.priceMax,
            description: item.description,
            dietary: item.dietary,
            spice: item.spice,
            featured: item.featured,
            accent: item.accent,
            image: item.image,
            containsNuts: item.containsNuts,
            glutenFree: item.glutenFree,
            dairyFree: item.dairyFree,
            available: item.available,
          }}
        />
      </div>
    </div>
  );
}
