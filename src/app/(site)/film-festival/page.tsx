import type { Metadata } from "next";
import { weekends, festival, nextScreening, isPast } from "@/data/filmFestival";
import { formatUGX } from "@/data/menu";
import { whatsappLink } from "@/data/site";
import ScreeningCard from "@/components/ScreeningCard";
import Reveal from "@/components/Reveal";
import FestivalFabricBackdrop from "@/components/FestivalFabricBackdrop";
import Carousel from "@/components/Carousel";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";

export const metadata: Metadata = {
  title: "Indian Film Festival — The Curry Leaf, Lubowa",
  description:
    "Three weekends of Indian and India-inspired cinema under the stars at The Curry Leaf, Lubowa. 14–30 August 2026. Lagaan, Gandhi, Slumdog Millionaire, 3 Idiots, Viceroy's House and more. Tickets UGX 20,000 at the door.",
};

const perkIcons = [
  <svg key="0" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M9 6l3-3 3 3" /></svg>,
  <svg key="1" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 10h12l-1 9H7z" /><path d="M9 10a3 3 0 0 1 6 0" /></svg>,
  <svg key="2" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21V9a2 2 0 0 1 2-2h1V4h4v3h1a2 2 0 0 1 2 2v12" /><path d="M10 21v-4h4v4" /></svg>,
  <svg key="3" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5M15 20c0-2.2 1.7-4 4.5-4" /></svg>,
];

export default function FilmFestivalPage() {
  const next = nextScreening();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-leaf-deep pt-32 pb-16 text-cream">
        <FestivalFabricBackdrop />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-chilli via-cream to-leaf" />
        <div className="relative z-10 mx-auto max-w-content px-5 text-center lg:px-8">
          <p className="text-xs uppercase tracking-[0.35em] text-saffron-light">
            The Curry Leaf Restaurant &amp; Bombay Adda Café Present
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold sm:text-6xl">
            Celebrate Indian Independence Day at The Curry Leaf!
          </h1>
          <p className="mt-4 font-serif text-3xl text-saffron-light">
            {festival.name}
          </p>
          <p className="mt-2 font-serif text-2xl text-cream/80">
            {festival.dates}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-cream/80">
            {festival.intro}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-cream/70">
            {festival.description}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-cream/70">
            {festival.detail}
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 text-left sm:grid-cols-4">
            {festival.perks.map((p, i) => (
              <div
                key={p}
                className="flex flex-col items-center gap-2 rounded-2xl bg-cream/5 px-3 py-4 text-center"
              >
                <span className="text-saffron-light">{perkIcons[i]}</span>
                <span className="text-xs text-cream/80">{p}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <TrackedWhatsAppLink
              href={whatsappLink(
                "Hello! I'd like to know more about the Indian Film Festival.",
              )}
              source="film-festival"
              message="Hello! I'd like to know more about the Indian Film Festival."
              className="rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
            >
              Ask Us About the Festival
            </TrackedWhatsAppLink>
            <a
              href="#schedule"
              className="rounded-full border border-cream/40 px-8 py-3.5 font-semibold text-cream transition-colors hover:border-saffron-light hover:text-saffron-light"
            >
              See Full Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Ticket band */}
      <section className="bg-saffron/10 py-6">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 text-center text-sm text-cocoa lg:px-8">
          <span>
            🎟️ Tickets <strong>{formatUGX(festival.ticketPrice)}</strong> per
            film — purchased at the door
          </span>
          <span className="hidden sm:inline text-cocoa/30">·</span>
          <span>📍 {festival.venue}</span>
        </div>
      </section>

      {/* Schedule */}
      <div id="schedule" className="mx-auto max-w-content px-5 py-16 lg:px-8">
        {weekends.map((weekend) => (
          <section key={weekend.id} className="mb-16 scroll-mt-24 last:mb-0">
            <Reveal>
              <div
                className="rounded-2xl px-6 py-4 text-cream"
                style={{ backgroundColor: weekend.accent }}
              >
                <p className="text-xs uppercase tracking-[0.3em] opacity-80">
                  {weekend.label}
                </p>
                <h2 className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">
                  {weekend.theme}
                </h2>
              </div>
            </Reveal>

            <div className="mt-10">
              <Carousel cardWidthClass="w-80 sm:w-96">
                {weekend.screenings.map((screening) => (
                  <ScreeningCard
                    key={screening.id}
                    screening={screening}
                    isNext={next?.id === screening.id}
                    isPast={isPast(screening)}
                  />
                ))}
              </Carousel>
            </div>
          </section>
        ))}
      </div>

      {/* Closing CTA */}
      <section className="bg-leaf-deep py-16 text-cream">
        <div className="mx-auto max-w-2xl px-5 text-center lg:px-8">
          <p className="font-serif text-2xl leading-relaxed sm:text-3xl">
            {festival.closing}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
            {festival.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="rounded-full border border-cream/30 px-6 py-3 font-semibold text-cream transition-colors hover:border-saffron-light hover:text-saffron-light"
              >
                📞 {phone}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
