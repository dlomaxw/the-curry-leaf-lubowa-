import type { BarScheduleRow } from "@/data/bar";

// Real primary shirt colours for the clubs on the schedule — a factual
// colour association, not a reproduction of any club's crest artwork.
// Keyed by the short form used in the schedule data (e.g. "Spurs").
const TEAM_COLORS: Record<string, string> = {
  Arsenal: "#EF0107",
  Coventry: "#78D0F2",
  Hull: "#F18A00",
  "Man United": "#DA291C",
  Brentford: "#E30613",
  Spurs: "#132257",
  "Man City": "#6CABDD",
  Bournemouth: "#DA291C",
  Newcastle: "#241F20",
  Liverpool: "#C8102E",
  Fulham: "#000000",
  Chelsea: "#034694",
  "Crystal Palace": "#1B458F",
  "Nottingham Forest": "#DD0000",
  Brighton: "#0057B8",
  "Aston Villa": "#670E36",
  Ipswich: "#0044A9",
  Everton: "#003399",
};

// Full official club names, for display — the schedule data uses common
// short forms (e.g. "Spurs", "Man United") to keep fixture text compact.
const FULL_TEAM_NAMES: Record<string, string> = {
  Coventry: "Coventry City",
  Hull: "Hull City",
  "Man United": "Manchester United",
  Spurs: "Tottenham Hotspur",
  "Man City": "Manchester City",
  Bournemouth: "AFC Bournemouth",
  Newcastle: "Newcastle United",
  Brighton: "Brighton & Hove Albion",
  Ipswich: "Ipswich Town",
};

const FALLBACK_COLORS = ["#53633F", "#A63827", "#C99528", "#2E3823", "#3E4B2F"];

function fullName(shortName: string) {
  return FULL_TEAM_NAMES[shortName] ?? shortName;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function colorFor(shortName: string) {
  if (TEAM_COLORS[shortName]) return TEAM_COLORS[shortName];
  let hash = 0;
  for (let i = 0; i < shortName.length; i++) hash = shortName.charCodeAt(i) + ((hash << 5) - hash);
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

function TeamBadge({ shortName }: { shortName: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 text-center">
      <span
        className="flex h-14 w-14 flex-none items-center justify-center rounded-full text-lg font-bold text-cream shadow-md ring-2 ring-cream/20"
        style={{ backgroundColor: colorFor(shortName) }}
      >
        {initials(shortName)}
      </span>
      <span className="w-full text-[0.68rem] font-semibold leading-tight text-cream">
        {fullName(shortName)}
      </span>
    </div>
  );
}

/** "Man United v Man City – Derby" -> { teams: ["Man United", "Man City"], tag: "Derby" } */
function parseFixture(event: string) {
  const [rawA, rest] = event.split(/\s+v\s+/i);
  if (!rest) return { teams: null, tag: null };
  const [rawB, tag] = rest.split(/\s+–\s+/);
  return { teams: [rawA.trim(), rawB.trim()] as [string, string], tag: tag?.trim() ?? null };
}

export default function MatchCard({ row }: { row: BarScheduleRow }) {
  const { teams, tag } = row.isQuiz ? { teams: null, tag: null } : parseFixture(row.event);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lg shadow-cocoa/10">
      <div
        className={`relative px-5 pt-5 pb-5 text-cream ${
          row.isQuiz
            ? "bg-gradient-to-br from-saffron to-chilli"
            : row.isBigMatch
              ? "bg-gradient-to-br from-chilli to-cocoa"
              : "bg-gradient-to-br from-leaf-deep to-cocoa"
        }`}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider backdrop-blur-sm">
            {row.isQuiz ? "🍹 Quiz Night" : row.isBigMatch ? "⭐ Big Match" : "⚽ Live Match"}
          </span>
          {tag && (
            <span className="inline-flex items-center rounded-full bg-saffron px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa">
              {tag}
            </span>
          )}
        </div>

        {teams ? (
          <div className="mt-4 flex items-start gap-2">
            <TeamBadge shortName={teams[0]} />
            <span className="mt-3.5 flex-none text-xs font-semibold text-cream/60">
              vs
            </span>
            <TeamBadge shortName={teams[1]} />
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
