import type { Metadata } from "next";
import BreakfastOrder from "@/components/BreakfastOrder";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Breakfast Ordering — Bombay Adda at The Curry Leaf, Lubowa",
  description:
    "Order breakfast for pickup or delivery in Lubowa and Kampala. The Kampala Breakfast, Bombay Rolex, shakshuka, parathas, baps, wraps and grab & go combos from Bombay Adda.",
};

const highlights = [
  {
    title: "Order ahead",
    text: "Choose your dishes and a morning slot — it's ready when you arrive.",
  },
  {
    title: "Pickup or delivery",
    text: `Collect it in Lubowa, or have it brought to you across ${site.delivery.areas}.`,
  },
  {
    title: "Grab & Go from UGX 12,000",
    text: "A main plus a drink for the mornings when you have five minutes.",
  },
];

export default function BreakfastPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-content px-5 pb-4 pt-10 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.35em] text-saffron">
          Bombay Adda · Breakfast {site.hours.breakfast}
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-leaf-deep">
          Breakfast, Your Way
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-cocoa/70">
          Freshly prepared favourites inspired by Ugandan, Indian and
          international breakfast traditions — for pickup in Lubowa or delivered
          to your door. All prices inclusive of VAT.
        </p>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border-t-4 border-saffron bg-cream p-5 shadow-sm shadow-sand/40"
            >
              <h2 className="font-serif text-lg font-semibold text-cocoa">
                {h.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-cocoa/65">
                {h.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BreakfastOrder />
    </div>
  );
}
