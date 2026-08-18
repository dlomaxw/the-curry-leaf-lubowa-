import { PrismaClient, Dietary } from "@prisma/client";
import bcrypt from "bcryptjs";
import { dishes } from "../src/data/menu";
import { breakfastItems } from "../src/data/breakfast";
import { barCategories } from "../src/data/bar";

const prisma = new PrismaClient();

const dietaryMap: Record<string, Dietary> = {
  veg: Dietary.VEG,
  vegan: Dietary.VEGAN,
  "non-veg": Dietary.NON_VEG,
};

async function main() {
  console.log("Seeding menu items...");
  for (let i = 0; i < dishes.length; i++) {
    const d = dishes[i];
    await prisma.menuItem.upsert({
      where: { id: d.id },
      update: {},
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

  console.log("Seeding breakfast items...");
  for (let i = 0; i < breakfastItems.length; i++) {
    const b = breakfastItems[i];
    await prisma.breakfastItem.upsert({
      where: { id: b.id },
      update: {},
      create: {
        id: b.id,
        name: b.name,
        category: b.category,
        price: b.price,
        priceMax: b.priceMax,
        description: b.description,
        includes: b.includes ?? [],
        choices: b.choices ? JSON.parse(JSON.stringify(b.choices)) : undefined,
        sortOrder: i,
      },
    });
  }

  console.log("Seeding bar items...");
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  let barSort = 0;
  for (const cat of barCategories) {
    const rows = cat.subcategories
      ? cat.subcategories.flatMap((sub) =>
          sub.items.map((item) => ({ ...item, subcategory: sub.label })),
        )
      : (cat.items ?? []).map((item) => ({ ...item, subcategory: null as string | null }));

    for (const item of rows) {
      const id = `bar-${slugify(cat.id)}-${slugify(item.subcategory ?? "")}-${slugify(item.name)}`;
      await prisma.barItem.upsert({
        where: { id },
        update: {},
        create: {
          id,
          category: cat.id,
          subcategory: item.subcategory,
          name: item.name,
          price: item.price ?? null,
          priceLabel: item.priceLabel ?? null,
          description: item.description ?? null,
          sortOrder: barSort++,
        },
      });
    }
  }

  const adminEmail = "admin@thecurryleaf.ug";
  const adminPassword = "ChangeMe123!";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        passwordHash: await bcrypt.hash(adminPassword, 10),
        role: "ADMIN",
      },
    });
    console.log(`Created admin account: ${adminEmail} / ${adminPassword}`);
    console.log("Sign in and change this password immediately from the dashboard.");
  } else {
    console.log("Admin account already exists, skipping.");
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
