import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { barOffers, barSchedule } from "@/data/bar";
import { whatsappLink } from "@/data/site";
import { getBarItems, type BarItemRow } from "@/lib/data/bar";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Bombay Adda Bar — Cocktails & Drinks | The Curry Leaf, Lubowa",
  description:
    "Bombay Adda — our bar at The Curry Leaf, Lubowa. Crafted cocktails, premium spirits, wine, beers and fresh flavours. Bar · Bites · Buzz.",
};

export const revalidate = 60;

function formatUGX(n: number) {
  return `UGX ${n.toLocaleString("en-UG")}`;
}

function toMenuItem(d: BarItemRow) {
  return {
    "@type": "MenuItem",
    name: d.name,
    description: d.priceLabel
      ? [d.description, d.priceLabel].filter(Boolean).join(" — ")
      : d.description,
    ...(d.price !== undefined
      ? { offers: { "@type": "Offer", price: d.price, priceCurrency: "UGX" } }
      : {}),
  };
}

export default async function BarPage() {
  const barCategories = await getBarItems();

  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Bombay Adda — Drinks Menu",
    hasMenuSection: barCategories.map((c) => ({
      "@type": "MenuSection",
      name: c.label,
      ...(c.items ? { hasMenuItem: c.items.map(toMenuItem) } : {}),
      ...(c.subcategories
        ? {
            hasMenuSection: c.subcategories.map((sub) => ({
              "@type": "MenuSection",
              name: sub.label,
              hasMenuItem: sub.items.map(toMenuItem),
            })),
          }
        : {}),
    })),
  };

  return (
    <div className="pt-24">
      <JsonLd data={menuJsonLd} />
      {/* Hero */}
      <div className="relative overflow-hidden bg-cocoa">
        <Image
          src="/images/bar/hero-cocktail.png"
          alt=""
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cocoa/60 via-cocoa/70 to-cocoa" />
        <div className="relative mx-auto flex max-w-content flex-col items-center px-5 py-20 text-center lg:px-8">
          <Image
            src="/images/bombay-adda-logo.png"
            alt="Bombay Adda — Bar · Bites · Buzz"
            width={220}
            height={220}
            priority
            className="h-32 w-32 drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)] sm:h-40 sm:w-40"
          />
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-saffron-light">
            The Curry Leaf&apos;s Bar
          </p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-cream sm:text-6xl">
            Bombay Adda
          </h1>
          <p className="mt-2 font-serif text-xl text-saffron-light sm:text-2xl">
            Bar · Bites · Buzz
          </p>
          <p className="mx-auto mt-5 max-w-xl text-cream/80">
            Crafted cocktails, premium spirits and fresh flavours — the bar
            that sits right alongside your table at The Curry Leaf.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappLink(
                "Hello Bombay Adda! I'd like to know more about the bar.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
            >
              Message Us on WhatsApp
            </a>
            <Link
              href="/reservations"
              className="rounded-full border border-cream/40 px-8 py-3.5 font-semibold text-cream transition-colors hover:border-saffron-light hover:text-saffron-light"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </div>

      {/* Offers */}
      <div className="mx-auto max-w-content px-5 pt-14 lg:px-8">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-3xl font-semibold text-leaf-deep">
            Bombay Adda Offers
          </h2>
          <div className="h-px flex-1 bg-sand" />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {barOffers.map((o) => (
            <div
              key={o.name}
              className="rounded-2xl border border-t-4 border-saffron/30 bg-saffron/[0.07] p-6 shadow-sm shadow-saffron/10"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-xl font-semibold text-cocoa">
                  {o.name}
                </h3>
                <p className="flex-none whitespace-nowrap font-serif text-base text-saffron">
                  {o.priceLabel}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-cocoa/65">
                {o.includes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Match & events schedule */}
      <div className="mx-auto max-w-content px-5 pt-14 lg:px-8">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-3xl font-semibold text-leaf-deep">
            What&apos;s On at Bombay Adda
          </h2>
          <div className="h-px flex-1 bg-sand" />
        </div>
        <p className="mt-2 text-sm text-cocoa/60">
          Live football, quiz nights and big-match specials — every offer
          below applies on the day shown.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-saffron/30 bg-saffron/[0.07] shadow-sm shadow-saffron/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-saffron/20 text-xs uppercase tracking-wider text-cocoa/50">
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Day</th>
                <th className="px-5 py-3 font-semibold">Time</th>
                <th className="px-5 py-3 font-semibold">Match / Event</th>
                <th className="px-5 py-3 font-semibold">Bombay Adda Offer</th>
              </tr>
            </thead>
            <tbody>
              {barSchedule.map((row, i) => (
                <tr
                  key={`${row.date}-${row.time}-${i}`}
                  className="border-b border-saffron/10 last:border-b-0"
                >
                  <td className="whitespace-nowrap px-5 py-3 text-cocoa/80">
                    {row.date}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-cocoa/80">
                    {row.day}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-cocoa/80">
                    {row.time}
                  </td>
                  <td
                    className={`px-5 py-3 ${
                      row.isBigMatch
                        ? "font-semibold text-cocoa"
                        : "text-cocoa/80"
                    }`}
                  >
                    {row.isQuiz ? "🍹 " : "⚽ "}
                    {row.event}
                  </td>
                  <td
                    className={`whitespace-nowrap px-5 py-3 ${
                      row.isBigMatch
                        ? "font-semibold text-saffron"
                        : "text-saffron/90"
                    }`}
                  >
                    {row.offer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick category jump */}
      <div className="sticky top-[68px] z-30 border-b border-sand/50 bg-white/95 px-5 py-3 backdrop-blur-md lg:px-8">
        <div className="mx-auto flex max-w-content gap-2 overflow-x-auto">
          {barCategories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="flex-none rounded-full border border-sand/60 bg-white px-4 py-2 text-xs font-semibold text-cocoa/70 transition-colors hover:border-saffron/60 hover:text-saffron"
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-content px-5 pb-24 lg:px-8">
        {barCategories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-32 pt-14">
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-3xl font-semibold text-leaf-deep">
                {cat.label}
              </h2>
              <div className="h-px flex-1 bg-sand" />
            </div>
            {cat.note && (
              <p className="mt-2 text-xs uppercase tracking-wider text-cocoa/50">
                {cat.note}
              </p>
            )}

            {cat.items && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {cat.items.map((d) => (
                  <div
                    key={d.id}
                    className="flex gap-4 rounded-2xl border border-t-4 border-saffron/30 bg-saffron/[0.07] p-6 shadow-sm shadow-saffron/10"
                  >
                    {d.image && (
                      <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl shadow-sm shadow-cocoa/15">
                        <Image
                          src={d.image}
                          alt={d.name}
                          fill
                          sizes="4rem"
                          className="object-cover"
                          unoptimized={!d.image.startsWith("/")}
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-serif text-xl font-semibold text-cocoa">
                          {d.name}
                        </h3>
                        <p className="flex-none whitespace-nowrap font-serif text-lg text-saffron">
                          {d.price !== undefined ? formatUGX(d.price) : d.priceLabel}
                        </p>
                      </div>
                      {d.description && (
                        <p className="mt-2 text-sm leading-relaxed text-cocoa/65">
                          {d.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cat.subcategories && (
              <div className="mt-6 space-y-8">
                {cat.subcategories.map((sub) => (
                  <div key={sub.label}>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-saffron">
                      {sub.label}
                    </h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {sub.items.map((d) => (
                        <div
                          key={d.id}
                          className="flex gap-4 rounded-2xl border border-t-4 border-saffron/30 bg-saffron/[0.07] p-6 shadow-sm shadow-saffron/10"
                        >
                          {d.image && (
                            <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl shadow-sm shadow-cocoa/15">
                              <Image
                                src={d.image}
                                alt={d.name}
                                fill
                                sizes="4rem"
                                className="object-cover"
                                unoptimized={!d.image.startsWith("/")}
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="font-serif text-xl font-semibold text-cocoa">
                                {d.name}
                              </h3>
                              <p className="flex-none whitespace-nowrap font-serif text-base text-saffron">
                                {d.price !== undefined ? formatUGX(d.price) : d.priceLabel}
                              </p>
                            </div>
                            {d.description && (
                              <p className="mt-2 text-sm leading-relaxed text-cocoa/65">
                                {d.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
