import { prisma } from "@/lib/prisma";
import type {
  BreakfastItem,
  BreakfastCategoryId,
  BreakfastChoice,
} from "@/data/breakfast";

/** Public-facing breakfast menu — only what's currently marked available. */
export async function getBreakfastItems(): Promise<BreakfastItem[]> {
  const rows = await prisma.breakfastItem.findMany({
    where: { available: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
  return rows.map(toBreakfastItem);
}

/** Every breakfast item, available or not — for the admin list. */
export async function getAllBreakfastItems() {
  return prisma.breakfastItem.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

function toBreakfastItem(row: {
  id: string;
  name: string;
  category: string;
  price: number;
  priceMax: number | null;
  description: string | null;
  includes: string[];
  choices: unknown;
}): BreakfastItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category as BreakfastCategoryId,
    price: row.price,
    priceMax: row.priceMax ?? undefined,
    description: row.description ?? undefined,
    includes: row.includes.length > 0 ? row.includes : undefined,
    choices: (row.choices as BreakfastChoice[] | null) ?? undefined,
  };
}
