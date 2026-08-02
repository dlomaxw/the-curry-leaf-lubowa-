import { PrismaClient, Dietary } from "@prisma/client";
import bcrypt from "bcryptjs";
import { dishes } from "../src/data/menu";
import { breakfastItems } from "../src/data/breakfast";

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
