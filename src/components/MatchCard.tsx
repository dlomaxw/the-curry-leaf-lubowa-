import type { BarScheduleRow } from "@/data/bar";

const AVATAR_COLORS = ["#53633F", "#A63827", "#C99528", "#2E3823", "#3E4B2F"];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function TeamBadge({ name }: { name: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 text-center">
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-cream shadow-md"
        style={{ backgroundColor: colorFor(name) }}
      >
        {initials(name)}
      </span>
      <span className="text-xs font-semibold leading-tight text-cocoa">
        {name}
      </span>
    </div>
  );
}

export default function MatchCard({ row }: { row: BarScheduleRow }) {
  const teams = row.isQuiz ? null : row.event.split(/\s+v\s+/i);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lg shadow-cocoa/10">
      <div
        className={`relative px-5 pt-5 pb-4 text-cream ${
          row.isQuiz
            ? "bg-gradient-to-br from-saffron to-chilli"
            : row.isBigMatch
              ? "bg-gradient-to-br from-chilli to-cocoa"
              : "bg-gradient-to-br from-leaf-deep to-cocoa"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider backdrop-blur-sm">
          {row.isQuiz ? "🍹 Quiz Night" : row.isBigMatch ? "⭐ Big Match" : "⚽ Live Match"}
        </span>

        {teams && teams.length === 2 ? (
          <div className="mt-4 flex items-center gap-3">
            <TeamBadge name={teams[0].trim()} />
            <span className="flex-none font-serif text-lg font-semibold text-cream/70">
              vs
            </span>
            <TeamBadge name={teams[1].trim()} />
          </div>
        ) : (
          <p className="mt-6 mb-2 text-center font-serif text-xl font-semibold">
            {row.event}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex items-center gap-4 text-sm text-cocoa/70">
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 9h18M8 3v4M16 3v4" />
            </svg>
            {row.day}, {row.date}
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            {row.time}
          </span>
        </div>
        <p className="mt-4 rounded-xl bg-saffron/10 px-3 py-2 text-center text-sm font-semibold text-saffron">
          {row.offer}
        </p>
      </div>
    </article>
  );
}
