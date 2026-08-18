import type { Metadata } from "next";
import ReservationForm from "@/components/ReservationForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Reserve a Table — The Curry Leaf, Lubowa",
  description:
    "Book your table at The Curry Leaf, Lubowa — family lunches, romantic dinners, corporate dining and the Sunday Grand Buffet.",
};

export default function ReservationsPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-content grid gap-12 px-5 py-12 lg:grid-cols-[2fr_3fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-saffron">
            Reservations
          </p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-leaf-deep">
            Reserve Your Table
          </h1>
          <p className="mt-5 leading-relaxed text-cocoa/70">
            Whether it&apos;s a quiet dinner on the veranda, a family sharing
            lunch, or the full Sunday Grand Buffet — tell us when, and
            we&apos;ll have your table ready.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-cocoa/80">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-saffron" />
              Lunch: {site.hours.lunch}
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-saffron" />
              {site.hours.buffet}
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-saffron" />
              {site.location}
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-saffron" />
              Groups of 12+ — mention it in the notes and we&apos;ll call you
              back to arrange the space.
            </li>
          </ul>
        </div>
        <ReservationForm />
      </div>
    </div>
  );
}
