import { PrismaClient, Dietary } from "@prisma/client";
import { dishes } from "../src/data/menu";

const prisma = new PrismaClient();

const dietaryMap: Record<string, Dietary> = {
  veg: Dietary.VEG,
  vegan: Dietary.VEGAN,
  "non-veg": Dietary.NON_VEG,
};

async function main() {
  const keepIds = dishes.map((d) => d.id);

  const removed = await prisma.menuItem.deleteMany({
    where: { id: { notIn: keepIds } },
  });
  console.log(`Removed ${removed.count} discontinued menu item(s).`);

  for (let i = 0; i < dishes.length; i++) {
    const d = dishes[i];
    await prisma.menuItem.upsert({
      where: { id: d.id },
      update: {
        name: d.name,
        category: d.category,
        price: d.price,
        description: d.description,
        dietary: dietaryMap[d.dietary],
        spice: d.spice,
        featured: d.featured ?? false,
        accent: d.accent,
        image: d.image,
        containsNuts: d.containsNuts ?? false,
        glutenFree: d.glutenFree ?? false,
        dairyFree: d.dairyFree ?? false,
        sortOrder: i,
      },
      create: {
        id: d.id,
        name: d.name,
        category: d.category,
        price: d.price,
        description: d.description,
        dietary: dietaryMap[d.dietary],
        spice: d.spice,
        featured: d.featured ?? false,
        accent: d.accent,
        image: d.image,
        containsNuts: d.containsNuts ?? false,
        glutenFree: d.glutenFree ?? false,
        dairyFree: d.dairyFree ?? false,
        sortOrder: i,
      },
    });
  }

  console.log(`Synced ${dishes.length} menu item(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
