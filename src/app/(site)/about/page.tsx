import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FallingSpices from "@/components/FallingSpices";

export const metadata: Metadata = {
  title: "About Us — Indian Street Kitchen & Social House | The Curry Leaf, Lubowa",
  description:
    "The story of The Curry Leaf — an Indian street kitchen turned Indian Kitchen & Social House, bringing the royal spice of Indian cuisine to a converted garden home in Lubowa, Kampala, alongside Bombay Adda and The Pizza Place.",
  keywords: [
    "indian street kitchen",
    "indian delicacy",
    "cuisine india",
    "royal spice",
    "indian traditional food",
    "spice india",
  ],
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="relative mx-auto max-w-content px-5 py-12 lg:px-8">
        <FallingSpices count={7} colorClass="text-leaf/35" className="-z-10" />
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-saffron">
            Our Story
          </p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-leaf-deep">
            An Indian Social House in a Garden Home
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cocoa/70">
            The Curry Leaf lives in a converted home in Lubowa, just off
            Entebbe Road — sunlit verandas, hand-painted Indian art on the
            walls, and a garden where the tandoor smoke drifts on Sunday
            afternoons. We call it a social house because that&apos;s what it
            is: a place to linger, share, and come back to.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            { src: "/images/entrance.webp", alt: "The Curry Leaf gate sign in Lubowa" },
            { src: "/images/dining-room.webp", alt: "The main dining room" },
            { src: "/images/garden-terrace.webp", alt: "The garden terrace and tandoor" },
          ].map((g, i) => (
            <Reveal key={g.src} delay={i * 0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-10 md:grid-cols-3">
          {[
            {
              title: "The Curry Leaf",
              text: "Our heart — authentic Indian kitchen classics from the tandoor and karahi, thali lunches and the Sunday Grand Buffet.",
            },
            {
              title: "Bombay Adda",
              text: "Bar, bites and brews — breakfast, brunch and grab-and-go, from the Kampala Breakfast to Uganda's beloved Rolex with a desi twist.",
            },
            {
              title: "The Pizza Place",
              text: "Wood-fired pizza, grill and comfort food — made fresh, made to share, right next door.",
            },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.12}>
              <h2 className="font-serif text-2xl font-semibold text-leaf-deep">
                {b.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cocoa/70">{b.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <p className="font-serif text-3xl text-cocoa">
            Good food · Great company · Warm hospitality
          </p>
          <Link
            href="/reservations"
            className="mt-8 inline-block rounded-full bg-leaf px-8 py-3.5 font-semibold text-cream transition-transform hover:scale-105"
          >
            Come Visit Us
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
