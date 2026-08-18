import type { Metadata } from "next";
import MenuBrowser from "@/components/MenuBrowser";
import JsonLd from "@/components/JsonLd";
import { getMenuItems } from "@/lib/data/menu";
import { categories } from "@/data/menu";

export const metadata: Metadata = {
  title: "Indian Menu — South Indian & Popular Indian Dishes | The Curry Leaf, Lubowa",
  description:
    "Browse the full Curry Leaf menu — south Indian dishes and popular Indian dishes alike, from tandoori appetisers and butter chicken to biryani, vegetarian curries, tandoor breads and thali lunches. Tasty, traditional Indian food — order Indian food online. All prices inclusive of VAT.",
  keywords: [
    "indian dishes",
    "south indian dishes",
    "south indian meals",
    "popular indian dishes",
    "tasty indian food",
    "order indian food online",
    "indian traditional food",
    "indian delicacy",
  ],
};

export const revalidate = 60;

export default async function MenuPage() {
  const dishes = await getMenuItems();

  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "The Curry Leaf — Launch Menu",
    hasMenuSection: categories
      .map((c) => ({
        "@type": "MenuSection",
        name: c.label,
        hasMenuItem: dishes
          .filter((d) => d.category === c.id)
          .map((d) => ({
            "@type": "MenuItem",
            name: d.name,
            description: d.description,
            offers: {
              "@type": "Offer",
              price: d.price,
              priceCurrency: "UGX",
            },
            suitableForDiet:
              d.dietary === "vegan"
                ? "https://schema.org/VeganDiet"
                : d.dietary === "veg"
                  ? "https://schema.org/VegetarianDiet"
                  : undefined,
          })),
      }))
      .filter((s) => s.hasMenuItem.length > 0),
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <JsonLd data={menuJsonLd} />
      <div className="mx-auto max-w-content px-5 pb-6 pt-10 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.35em] text-saffron">
          All Prices Inclusive of VAT
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-leaf-deep">
          The Launch Menu
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-cocoa/70">
          From the tandoor and the karahi — search, filter and find your next
          favourite dish.
        </p>
      </div>
      <MenuBrowser dishes={dishes} />
    </div>
  );
}
