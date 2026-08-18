import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeatureIcons from "@/components/FeatureIcons";
import MenuShowcase from "@/components/MenuShowcase";
import {
  FilmFestivalBand,
  BarBand,
  BreakfastBand,
  BuffetBand,
  ExperiencesTeaser,
  GalleryStrip,
  ContactCta,
} from "@/components/HomeSections";
import { getMenuItems } from "@/lib/data/menu";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Curry Leaf — Indian Food Near Me in Lubowa, Kampala",
  description:
    "Looking for Indian food near you? The Curry Leaf is Kampala's Indian Kitchen & Social House in Lubowa — spicy Indian food, south Indian meals, tandoor classics, curry takeaway and Bombay Adda's bar. All prices inclusive of VAT.",
  keywords: [
    "indian food near me",
    "south indian meals near me",
    "curry takeaway near me",
    "indian food near me delivery",
    "indian foods near me",
    "indian kitchen",
    "spicy indian food",
    "food indian",
  ],
};

export default async function Home() {
  const dishes = await getMenuItems();

  return (
    <>
      <Hero />
      <FilmFestivalBand />
      <FeatureIcons />
      <MenuShowcase dishes={dishes} />
      <BarBand />
      <BreakfastBand />
      <BuffetBand />
      <ExperiencesTeaser />
      <GalleryStrip />
      <ContactCta />
    </>
  );
}
