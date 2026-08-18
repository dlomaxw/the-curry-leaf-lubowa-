import { prisma } from "@/lib/prisma";
import { barCategories as barCategoryDefs } from "@/data/bar";
import type { BarDrink } from "@/data/bar";

export interface BarItemRow extends BarDrink {
  id: string;
  category: string;
  subcategory: string | null;
  image: string | null;
}

export interface BarSubcategoryGroup {
  label: string;
  items: BarItemRow[];
}

export interface BarCategoryGroup {
  id: string;
  label: string;
  note?: string;
  items?: BarItemRow[];
  subcategories?: BarSubcategoryGroup[];
}

function toRow(row: {
  id: string;
  category: string;
  subcategory: string | null;
  name: string;
  price: number | null;
  priceLabel: string | null;
  description: string | null;
  image: string | null;
}): BarItemRow {
  return {
    id: row.id,
    category: row.category,
    subcategory: row.subcategory,
    name: row.name,
    price: row.price ?? undefined,
    priceLabel: row.priceLabel ?? undefined,
    description: row.description ?? undefined,
    image: row.image,
  };
}

/** Groups flat DB rows back into the category/subcategory shape the public page renders. */
function group(rows: BarItemRow[]): BarCategoryGroup[] {
  return barCategoryDefs
    .map((def) => {
      const inCategory = rows.filter((r) => r.category === def.id);
      if (def.subcategories) {
        const subcategories = def.subcategories
          .map((sub) => ({
            label: sub.label,
            items: inCategory.filter((r) => r.subcategory === sub.label),
          }))
          .filter((s) => s.items.length > 0);
        return { id: def.id, label: def.label, note: def.note, subcategories };
      }
      return { id: def.id, label: def.label, note: def.note, items: inCategory };
    })
    .filter((c) => (c.items?.length ?? 0) > 0 || (c.subcategories?.length ?? 0) > 0);
}

/** Public-facing bar menu — only what's currently marked available. */
export async function getBarItems(): Promise<BarCategoryGroup[]> {
  const rows = await prisma.barItem.findMany({
    where: { available: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
  return group(rows.map(toRow));
}

/** Every bar item, available or not — for the admin list. */
export async function getAllBarItems() {
  return prisma.barItem.findMany({
    orderBy: [{ category: "asc" }, { subcategory: "asc" }, { sortOrder: "asc" }],
  });
}
