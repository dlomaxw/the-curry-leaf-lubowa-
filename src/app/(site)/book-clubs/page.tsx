import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FallingSpices from "@/components/FallingSpices";
import {
  bookClubs,
  bookClubsIntro,
  bookClubContact,
  bookClubWhatsappLink,
} from "@/data/bookClubs";

export const metadata: Metadata = {
  title: "Book Clubs — The Curry Leaf, Lubowa",
  description:
    "Two new monthly book clubs at The Curry Leaf, Lubowa: The Booker Prize Book Club and The Asian Book Club. Join one, or both.",
};

export default function BookClubsPage() {
  return (
    <div className="pt-24">
      <div className="relative mx-auto max-w-content px-5 py-12 lg:px-8">
        <FallingSpices count={7} colorClass="text-leaf/35" className="-z-10" />

        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-saffron">
            {bookClubsIntro.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-leaf-deep sm:text-5xl">
            {bookClubsIntro.heading}
          </h1>
          <p className="mt-6 leading-relaxed text-cocoa/70">
            {bookClubsIntro.lede}
          </p>
          <p className="mt-4 leading-relaxed text-cocoa/70">
            {bookClubsIntro.body}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {bookClubs.map((club, i) => (
            <Reveal key={club.id} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg shadow-cocoa/5 backdrop-blur-md">
                <p className="text-3xl">{club.emoji}</p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-leaf-deep">
                  {club.name}
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-saffron">
                  {club.frequency}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cocoa/70">
                  {club.description}
                </p>

                <div className="mt-6 rounded-2xl border border-t-4 border-saffron/30 bg-saffron/[0.07] p-5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-saffron">
                    {club.currentRead.note}
                  </p>
                  <p className="mt-2 font-serif text-lg font-semibold text-cocoa">
                    {club.currentRead.title}
                    {club.currentRead.flag && (
                      <span className="ml-2">{club.currentRead.flag}</span>
                    )}
                  </p>
                  <p className="text-sm text-cocoa/60">
                    by {club.currentRead.author}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa/70">
                    {club.currentRead.synopsis}
                  </p>
                </div>

                {club.extraNote && (
                  <p className="mt-5 text-sm leading-relaxed text-cocoa/60">
                    {club.extraNote}
                  </p>
                )}

                <div className="mt-6 space-y-1 border-t border-sand/60 pt-5 text-sm">
                  <p className="text-cocoa/80">
                    <span className="font-semibold text-cocoa">
                      First meeting:
                    </span>{" "}
                    {club.firstMeeting}
                    {club.meetingTime && ` · ${club.meetingTime}`}
                  </p>
                  <p className="text-cocoa/80">
                    <span className="font-semibold text-cocoa">Where:</span>{" "}
                    {club.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-16 max-w-2xl text-center">
          <p className="leading-relaxed text-cocoa/70">
            {bookClubsIntro.closing}
          </p>
          <p className="mt-4 font-serif text-2xl text-leaf-deep">
            {bookClubsIntro.tagline}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-xl rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-lg shadow-cocoa/5 backdrop-blur-md">
          <p className="text-cocoa/70">
            If you&apos;d like to join, message us directly and we&apos;ll add
            you to the relevant WhatsApp group.
          </p>
          <a
            href={bookClubWhatsappLink(
              "Hello! I'd like to join a Curry Leaf book club.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
          >
            Message {bookClubContact.name} on WhatsApp
          </a>
          <p className="mt-4 text-xs uppercase tracking-wider text-cocoa/50">
            {bookClubContact.phoneDisplay} · {bookClubContact.note}
          </p>
        </Reveal>

        <Reveal className="mt-16 text-center">
          <Link
            href="/reservations"
            className="inline-block rounded-full border border-leaf px-8 py-3.5 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-cream"
          >
            Reserve a Table
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
