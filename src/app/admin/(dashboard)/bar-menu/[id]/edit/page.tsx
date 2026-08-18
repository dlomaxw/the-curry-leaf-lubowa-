import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BarItemForm from "../../BarItemForm";
import { updateBarItem } from "../../actions";

export default async function EditBarItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.barItem.findUnique({ where: { id } });
  if (!item) notFound();

  const boundAction = updateBarItem.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/bar-menu"
        className="text-xs font-semibold uppercase tracking-wider text-cocoa/50 hover:text-cocoa"
      >
        ← Back to Bar Menu
      </Link>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-leaf-deep">
        Edit {item.name}
      </h1>
      <div className="mt-6 rounded-2xl bg-cream p-6 shadow-sm shadow-sand/40">
        <BarItemForm
          action={boundAction}
          submitLabel="Save Changes"
          initial={{
            name: item.name,
            category: item.category,
            subcategory: item.subcategory,
            price: item.price,
            priceLabel: item.priceLabel,
            description: item.description,
            image: item.image,
            available: item.available,
          }}
        />
      </div>
    </div>
  );
}
