import { prisma } from "@/lib/prisma";
import type { Dish, Dietary, Spice, CategoryId } from "@/data/menu";

const dietaryFromDb: Record<string, Dietary> = {
  VEG: "veg",
  VEGAN: "vegan",
  NON_VEG: "non-veg",
};

/** Public-facing dishes — only what's currently marked available. */
export async function getMenuItems(): Promise<Dish[]> {
  const rows = await prisma.menuItem.findMany({
    where: { available: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
  return rows.map(toDish);
}

/** Every dish, available or not — for the admin list. */
export async function getAllMenuItems() {
  return prisma.menuItem.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

function toDish(row: {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  dietary: string;
  spice: number;
  featured: boolean;
  accent: string | null;
  image: string | null;
  containsNuts: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
}): Dish {
  return {
    id: row.id,
    name: row.name,
    category: row.category as CategoryId,
    price: row.price,
    description: row.description,
    dietary: dietaryFromDb[row.dietary] ?? "veg",
    spice: row.spice as Spice,
    featured: row.featured,
    accent: row.accent ?? undefined,
    image: row.image ?? undefined,
    containsNuts: row.containsNuts,
    glutenFree: row.glutenFree,
    dairyFree: row.dairyFree,
  };
}
