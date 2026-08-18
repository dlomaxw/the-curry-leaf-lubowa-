import type { Metadata } from "next";
import Link from "next/link";
import { barSchedule } from "@/data/bar";
import { festival } from "@/data/filmFestival";
import { bookClubs } from "@/data/bookClubs";
import { communityEvents } from "@/data/communityEvents";
import Carousel from "@/components/Carousel";
import MatchCard from "@/components/MatchCard";

export const metadata: Metadata = {
  title: "Events — Film Festival, Book Clubs & Bombay Adda | The Curry Leaf, Lubowa",
  description:
    "What's on at The Curry Leaf, Lubowa — the Indian Film Festival, our book clubs, and Bombay Adda's live football, quiz nights and big-match specials.",
};

export default function EventsPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-content px-5 py-12 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.35em] text-saffron">
          What&apos;s On
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-leaf-deep">
          Events at The Curry Leaf
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-cocoa/70">
          Everything happening on a date — the Indian Film Festival, our book
          clubs, and Bombay Adda&apos;s live matches and quiz nights.
        </p>
      </div>

      {/* Community events */}
      {communityEvents.map((ev) => (
        <div key={ev.id} className="mx-auto max-w-content px-5 pb-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-leaf-deep to-cocoa text-cream shadow-lg shadow-cocoa/10">
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-saffron px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa">
                  Community Event
                </span>
                {ev.edition && (
                  <span className="rounded-full bg-cream/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider">
                    {ev.edition}
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
                {ev.name}
              </h2>
              <p className="mt-1 font-serif text-lg text-saffron-light">
                {ev.tagline}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-cream/80">
                <span>📅 {ev.date}</span>
                <span>🕗 {ev.time}</span>
                <span>📍 {ev.venue}</span>
              </div>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {ev.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-cream/85">
                    <span className="mt-0.5 text-saffron-light">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* Teaser cards */}
      <div className="mx-auto grid max-w-content gap-6 px-5 pb-4 sm:grid-cols-2 lg:px-8">
        <Link
          href="/film-festival"
          className="group rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg shadow-cocoa/5 backdrop-blur-md transition-shadow hover:shadow-xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-saffron">
            {festival.dates}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-leaf-deep">
            {festival.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cocoa/70">
            {festival.intro}
          </p>
          <span className="mt-5 inline-block text-sm font-semibold text-saffron group-hover:underline">
            See the full schedule →
          </span>
        </Link>

        <Link
          href="/book-clubs"
          className="group rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg shadow-cocoa/5 backdrop-blur-md transition-shadow hover:shadow-xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-saffron">
            Monthly
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-leaf-deep">
            Book Clubs
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cocoa/70">
            Two monthly book clubs — The Booker Prize Book Club and The Asian
            Book Club. Next meetings:{" "}
            {bookClubs.map((c) => c.firstMeeting).join(" · ")}.
          </p>
          <span className="mt-5 inline-block text-sm font-semibold text-saffron group-hover:underline">
            See both clubs →
          </span>
        </Link>
      </div>

      {/* Bombay Adda match & quiz schedule */}
      <div className="mx-auto max-w-content px-5 py-14 lg:px-8">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-3xl font-semibold text-leaf-deep">
            What&apos;s On at Bombay Adda
          </h2>
          <div className="h-px flex-1 bg-sand" />
        </div>
        <p className="mt-2 text-sm text-cocoa/60">
          Live football, quiz nights and big-match specials — every offer
          below applies on the day shown.{" "}
          <Link href="/bar" className="font-semibold text-saffron underline underline-offset-2">
            See the full drinks menu and standing offers →
          </Link>
        </p>
        <div className="relative mt-14">
          <Carousel>
            {barSchedule.map((row, i) => (
              <MatchCard key={`${row.date}-${row.time}-${i}`} row={row} />
            ))}
          </Carousel>
        </div>
      </div>

      <div className="mx-auto max-w-content px-5 pb-24 text-center lg:px-8">
        <Link
          href="/reservations"
          className="inline-block rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
        >
          Reserve a Table
        </Link>
      </div>
    </div>
  );
}
