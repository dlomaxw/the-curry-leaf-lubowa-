import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import SpinText from "./SpinText";
import { sundayBuffet, formatUGX } from "@/data/menu";
import { site, whatsappLink } from "@/data/site";
import { festival } from "@/data/filmFestival";
import FestivalRiceArt from "./FestivalRiceArt";

export function FilmFestivalBand() {
  return (
    <section className="relative overflow-hidden bg-leaf-deep py-16 text-cream">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-chilli via-cream to-leaf" />
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-leaf via-cream to-chilli" />
      <div className="mx-auto grid max-w-content items-center gap-10 px-5 lg:grid-cols-[22rem_1fr] lg:gap-14 lg:px-8">
        <FestivalRiceArt />

        <Reveal className="text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-saffron-light">
            Special Event · {festival.dates}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Celebrate Indian Independence Day at The Curry Leaf!
          </h2>
          <p className="mt-3 font-serif text-xl text-saffron-light">
            {festival.name}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-cream/75 lg:mx-0">
            Three weekends of cinema under the stars, celebrating India
            through film. Lagaan, Gandhi, Slumdog Millionaire, 3 Idiots,
            Viceroy&apos;s House and more — with selected indoor afternoon
            screenings too.
          </p>
          <p className="mt-3 text-sm text-saffron-light">
            Tickets {formatUGX(festival.ticketPrice)} per film · At the door
          </p>
          <Link
            href="/film-festival"
            className="mt-7 inline-block rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
          >
            <SpinText text="See the Full Schedule" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function BarBand() {
  return (
    <section className="relative overflow-hidden bg-cocoa py-20 text-cream">
      <Image
        src="/images/bar/hero-cocktail.png"
        alt=""
        fill
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa/70 via-cocoa/60 to-cocoa" />
      <div className="relative mx-auto grid max-w-content items-center gap-10 px-5 lg:grid-cols-[auto_1fr] lg:gap-14 lg:px-8">
        <Reveal className="flex justify-center lg:justify-start">
          <Image
            src="/images/bombay-adda-logo.png"
            alt="Bombay Adda — Bar · Bites · Buzz"
            width={200}
            height={200}
            className="h-32 w-32 drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)] sm:h-40 sm:w-40"
          />
        </Reveal>

        <Reveal delay={0.1} className="text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-saffron-light">
            We Also Have a Bar
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Bombay Adda — Bar · Bites · Buzz
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/75 lg:mx-0">
            Crafted cocktails, premium spirits, wine and fresh flavours —
            right alongside your table. Signature margaritas, espresso
            martinis, mocktails and more.
          </p>
          <Link
            href="/bar"
            className="mt-7 inline-block rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
          >
            <SpinText text="Explore the Bar Menu" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

const morningPicks = [
  { name: "The Kampala Breakfast", price: 42000 },
  { name: "Bombay Rolex", price: 20000 },
  { name: "Shakshuka", price: 32000 },
  { name: "Quick Bite Combo", price: 12000 },
];

export function BreakfastBand() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-content gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-saffron">
            Bombay Adda · {site.hours.breakfast}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-leaf-deep sm:text-5xl">
            Order Breakfast for Pickup or Delivery
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-cocoa/70">
            Ugandan, Indian and international breakfast traditions, freshly
            prepared. Order ahead and collect it in Lubowa, or have it delivered
            across {site.delivery.areas}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/breakfast"
              className="rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
            >
              <SpinText text="Order Breakfast" />
            </Link>
            <Link
              href="/breakfast#combos"
              className="rounded-full border border-leaf px-8 py-3.5 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-cream"
            >
              Grab &amp; Go from UGX 12,000
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="grid gap-3">
            {morningPicks.map((p) => (
              <li
                key={p.name}
                className="flex items-baseline justify-between gap-4 rounded-2xl border border-white/60 bg-white/70 px-5 py-4 backdrop-blur-md shadow-sm shadow-cocoa/5"
              >
                <span className="font-serif text-lg text-cocoa">{p.name}</span>
                <span className="flex-none font-serif text-lg text-saffron">
                  {formatUGX(p.price)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-cocoa/50">
            Full breakfast menu, combos and morning drinks on the ordering page.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function BuffetBand() {
  return (
    <section className="bg-leaf-deep py-20 text-cream">
      <div className="mx-auto grid max-w-content gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-saffron-light">
            {sundayBuffet.time}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            {sundayBuffet.name}
          </h2>
          <p className="mt-4 max-w-md text-cream/75">
            One long Sunday table. Unlimited curries from the tandoor and the
            karahi, fresh naan, biryani, desserts and masala chai — the way
            Sunday lunch should be.
          </p>
          <div className="mt-6 flex gap-8 font-serif text-2xl">
            <div>
              <p className="text-saffron-light">{formatUGX(sundayBuffet.adults)}</p>
              <p className="mt-1 text-xs font-sans uppercase tracking-wider text-cream/60">
                Adults
              </p>
            </div>
            <div>
              <p className="text-saffron-light">{formatUGX(sundayBuffet.children)}</p>
              <p className="mt-1 text-xs font-sans uppercase tracking-wider text-cream/60">
                Children under 12
              </p>
            </div>
          </div>
          <Link
            href="/reservations"
            className="mt-8 inline-block rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
          >
            <SpinText text="Book Your Sunday Table" />
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="grid gap-3">
            {sundayBuffet.includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-saffron-light" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

const experiences = [
  {
    title: "Family Dining",
    text: "Tandoori sharing platters, family feasts and a garden the children can run in. Weekend family lunches are what we were built for.",
    href: "/experiences#family",
    accent: "border-saffron",
  },
  {
    title: "Corporate & Business",
    text: "Business pizza lunches, executive lunch menus and private meeting tables — minutes from Entebbe Road.",
    href: "/experiences#corporate",
    accent: "border-leaf",
  },
  {
    title: "Private Celebrations",
    text: "Birthdays, anniversaries and engagements with a customised menu and a room of your own.",
    href: "/experiences#private",
    accent: "border-chilli",
  },
];

export function ExperiencesTeaser() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-content px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-saffron">
            More Than a Meal
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-leaf-deep sm:text-5xl">
            Dining Experiences
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {experiences.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.12}>
              <Link
                href={e.href}
                className={`block h-full rounded-3xl border-t-4 bg-white/70 p-8 shadow-lg shadow-cocoa/5 backdrop-blur-md transition-transform hover:-translate-y-1.5 ${e.accent}`}
              >
                <h3 className="font-serif text-2xl font-semibold text-cocoa">
                  {e.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cocoa/70">
                  {e.text}
                </p>
                <span className="mt-6 inline-block text-sm font-semibold text-leaf">
                  Explore →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const gallery = [
  { src: "/images/garden-terrace.webp", alt: "The garden terrace and tandoor at The Curry Leaf" },
  { src: "/images/dining-room.webp", alt: "The main dining room with hand-painted Indian art" },
  { src: "/images/veranda.webp", alt: "The sunlit veranda overlooking the garden" },
  { src: "/images/entrance.webp", alt: "The Curry Leaf entrance sign in Lubowa" },
];

export function GalleryStrip() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-content px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-saffron">
            Our Home in Lubowa
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-leaf-deep sm:text-5xl">
            A Contemporary Indian Social House
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-cocoa/70">
            A converted garden home off Entebbe Road — warm rooms, a shaded
            veranda, and the tandoor at the heart of it all.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.1} className={i % 2 === 1 ? "lg:mt-10" : ""}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-content px-5 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-4xl font-semibold text-leaf-deep sm:text-5xl">
            Your table is waiting
          </h2>
          <p className="mt-4 text-cocoa/70">
            {site.location} · Lunch {site.hours.lunch}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/reservations"
              className="rounded-full bg-leaf px-8 py-3.5 font-semibold text-cream transition-transform hover:scale-105"
            >
              Reserve a Table
            </Link>
            <a
              href={`tel:${site.phoneHref}`}
              className="rounded-full border border-leaf px-8 py-3.5 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-cream"
            >
              Call {site.phone}
            </a>
            <a
              href={whatsappLink("Hello The Curry Leaf!")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-leaf px-8 py-3.5 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-cream"
            >
              WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-1.5 shadow-lg shadow-cocoa/5 backdrop-blur-md">
            <iframe
              src={site.map.embed}
              title="Map showing The Curry Leaf in Lubowa, Kampala"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-80 w-full rounded-2xl border-0 sm:h-96"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href={site.map.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-leaf underline underline-offset-4 hover:text-saffron"
            >
              Open in Google Maps — get directions
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
