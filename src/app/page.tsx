import Hero from "@/components/Hero";
import FeatureIcons from "@/components/FeatureIcons";
import MenuShowcase from "@/components/MenuShowcase";
import {
  BreakfastBand,
  BuffetBand,
  ExperiencesTeaser,
  GalleryStrip,
  ContactCta,
} from "@/components/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureIcons />
      <MenuShowcase />
      <BreakfastBand />
      <BuffetBand />
      <ExperiencesTeaser />
      <GalleryStrip />
      <ContactCta />
    </>
  );
}
