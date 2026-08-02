import type { Metadata } from "next";
import MenuBrowser from "@/components/MenuBrowser";
import { getMenuItems } from "@/lib/data/menu";

export const metadata: Metadata = {
  title: "Menu — The Curry Leaf, Lubowa",
  description:
    "Browse the full Curry Leaf launch menu: tandoori appetisers, butter chicken, biryani, vegetarian curries, tandoor breads, thali lunches and desserts. All prices inclusive of VAT.",
};

export const revalidate = 60;

export default async function MenuPage() {
  const dishes = await getMenuItems();

  return (
    <div className="pt-24">
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
