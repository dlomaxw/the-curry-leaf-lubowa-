import type { Screening } from "@/data/filmFestival";
import FilmTrailer from "./FilmTrailer";

const settingIcon = {
  outdoor: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  ),
  indoor: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  ),
};

const settingLabel = {
  outdoor: "Outdoor · Under the Stars",
  indoor: "Indoor · Afternoon Cinema",
};

export default function ScreeningCard({
  screening,
  isNext,
  isPast,
}: {
  screening: Screening;
  isNext?: boolean;
  isPast?: boolean;
}) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm shadow-cocoa/5 backdrop-blur-md transition-shadow hover:shadow-lg hover:shadow-cocoa/10 ${
        isPast ? "opacity-60" : ""
      }`}
    >
      <FilmTrailer film={screening.film} />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-leaf/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-leaf">
            {screening.dayLabel} {screening.dateLabel}
          </span>
          <span className="rounded-full bg-sand/50 px-2.5 py-0.5 text-[0.65rem] font-semibold text-cocoa/70">
            {screening.time}
          </span>
          {screening.independenceDay && (
            <span className="rounded-full bg-chilli/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-chilli">
              Independence Day
            </span>
          )}
          {isNext && !isPast && (
            <span className="rounded-full bg-saffron px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa">
              Next Up
            </span>
          )}
          {isPast && (
            <span className="rounded-full bg-cocoa/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa/50">
              This one has screened
            </span>
          )}
        </div>

        <h3 className="mt-3 font-serif text-2xl font-semibold text-cocoa">
          {screening.film.title}{" "}
          <span className="text-base font-sans font-normal text-cocoa/40">
            ({screening.film.year})
          </span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cocoa/65">
          {screening.film.description}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-cocoa/50">
          {settingIcon[screening.setting]}
          {settingLabel[screening.setting]}
        </div>
      </div>
    </article>
  );
}
