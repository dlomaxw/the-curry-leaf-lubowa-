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
