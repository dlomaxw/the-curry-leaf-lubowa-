// The Curry Leaf & Bombay Adda — Indian Film Festival, 14–30 August 2026.
// Contact numbers are specific to the festival as printed on the flyer.

export const festival = {
  name: "Indian Film Festival",
  dates: "14 – 30 August 2026",
  startDate: "2026-08-14",
  endDate: "2026-08-30",
  ticketPrice: 20000,
  venue: "Bombay Adda Café & Bar at The Curry Leaf, Lubowa",
  phones: ["+256 765 176232", "+256 763 679123"],
  intro:
    "15 August marks Indian Independence Day, and this year The Curry Leaf is celebrating with three weekends of incredible Indian and India-inspired cinema in Lubowa.",
  description:
    "Join us as we celebrate India through film — exploring its history, culture, people and stories, as well as the fascinating connections between India and Britain.",
  detail:
    "Every Friday, Saturday and Sunday evening, settle into our beautiful garden for cinema under the stars. And for those who prefer a daytime outing, we'll also be hosting selected indoor afternoon screenings.",
  closing:
    "Come early, enjoy some Indian food and drinks, and settle in for a great film. We can't wait to welcome you.",
  perks: [
    "Great movies under the stars",
    "Delicious Indian food & drinks",
    "Complimentary welcome drink with every ticket",
    "Great company, beautiful garden, amazing vibes",
  ],
};

export type Setting = "outdoor" | "indoor";

export interface Film {
  id: string;
  title: string;
  year: number;
  description: string;
  youtubeId: string;
  /** Fallback tint behind the trailer thumbnail while it loads. */
  accent: string;
}

export interface Screening {
  id: string;
  date: string; // ISO yyyy-mm-dd
  dayLabel: string; // "Fri", "Sat", "Sun"
  dateLabel: string; // "14 Aug"
  time: string; // "7:00pm"
  setting: Setting;
  independenceDay?: boolean;
  film: Film;
}

export interface Weekend {
  id: string;
  label: string;
  theme: string;
  accent: string;
  screenings: Screening[];
}

const films: Record<string, Film> = {
  whiteTiger: {
    id: "white-tiger",
    title: "The White Tiger",
    year: 2021,
    description:
      "A gripping story of ambition, class and survival in modern India.",
    youtubeId: "35jJNyFuYKQ",
    accent: "#A63827",
  },
  slumdog: {
    id: "slumdog-millionaire",
    title: "Slumdog Millionaire",
    year: 2008,
    description:
      "A Mumbai street kid's journey to India's biggest quiz show. A story of hope, destiny and never giving up.",
    youtubeId: "9oZcK97IAu4",
    accent: "#C99528",
  },
  manWhoKnewInfinity: {
    id: "man-who-knew-infinity",
    title: "The Man Who Knew Infinity",
    year: 2015,
    description:
      "The incredible true story of Srinivasa Ramanujan and his journey to Cambridge.",
    youtubeId: "NP0lUqNAw3k",
    accent: "#53633F",
  },
  gandhi: {
    id: "gandhi",
    title: "Gandhi",
    year: 1982,
    description:
      "The epic story of Mahatma Gandhi and India's struggle for independence.",
    youtubeId: "7DZDAcjOoiI",
    accent: "#2E3823",
  },
  threeIdiots: {
    id: "3-idiots",
    title: "3 Idiots",
    year: 2009,
    description:
      "Three engineering students challenge the system and find their own path. Funny, touching and timeless.",
    youtubeId: "xvszmNXdM4w",
    accent: "#C99528",
  },
  lunchbox: {
    id: "the-lunchbox",
    title: "The Lunchbox",
    year: 2013,
    description:
      "A mistaken lunchbox delivery sparks an unexpected bond. A beautiful story about connection.",
    youtubeId: "ENgWVvQYCxg",
    accent: "#A63827",
  },
  lagaan: {
    id: "lagaan",
    title: "Lagaan",
    year: 2001,
    description:
      "Villagers take on the British in a cricket match to win freedom. Epic, inspiring and unforgettable.",
    youtubeId: "BzJmHad6IWg",
    accent: "#53633F",
  },
  marigoldHotel: {
    id: "best-exotic-marigold-hotel",
    title: "The Best Exotic Marigold Hotel",
    year: 2011,
    description:
      "A group of British retirees find adventure and friendship in India. Warm, funny and heart-warming.",
    youtubeId: "BHc_ZTEH0VU",
    accent: "#C99528",
  },
  viceroysHouse: {
    id: "viceroys-house",
    title: "Viceroy's House",
    year: 2017,
    description:
      "The end of British rule in India through the eyes of those who lived it.",
    youtubeId: "UO_CyWGD83o",
    accent: "#2E3823",
  },
  englishVinglish: {
    id: "english-vinglish",
    title: "English Vinglish",
    year: 2012,
    description:
      "A homemaker rediscovers her confidence and self-worth in a new country. Inspiring and uplifting.",
    youtubeId: "2XaMHg_DdBk",
    accent: "#A63827",
  },
  bhagatSingh: {
    id: "legend-of-bhagat-singh",
    title: "The Legend of Bhagat Singh",
    year: 2002,
    description:
      "The inspiring story of India's revolutionary hero who fought fearlessly for freedom.",
    youtubeId: "jn3xU0qEj80",
    accent: "#53633F",
  },
};

export const weekends: Weekend[] = [
  {
    id: "weekend-1",
    label: "Weekend 1",
    theme: "India & Society",
    accent: "#A63827",
    screenings: [
      {
        id: "w1-fri",
        date: "2026-08-14",
        dayLabel: "Fri",
        dateLabel: "14 Aug",
        time: "7:00pm",
        setting: "outdoor",
        film: films.whiteTiger,
      },
      {
        id: "w1-sat",
        date: "2026-08-15",
        dayLabel: "Sat",
        dateLabel: "15 Aug",
        time: "7:00pm",
        setting: "outdoor",
        independenceDay: true,
        film: films.slumdog,
      },
      {
        id: "w1-sun",
        date: "2026-08-16",
        dayLabel: "Sun",
        dateLabel: "16 Aug",
        time: "7:00pm",
        setting: "outdoor",
        film: films.manWhoKnewInfinity,
      },
    ],
  },
  {
    id: "weekend-2",
    label: "Weekend 2",
    theme: "People, Dreams & Relationships",
    accent: "#53633F",
    screenings: [
      {
        id: "w2-fri",
        date: "2026-08-21",
        dayLabel: "Fri",
        dateLabel: "21 Aug",
        time: "7:00pm",
        setting: "outdoor",
        film: films.gandhi,
      },
      {
        id: "w2-sat",
        date: "2026-08-22",
        dayLabel: "Sat",
        dateLabel: "22 Aug",
        time: "7:00pm",
        setting: "outdoor",
        film: films.threeIdiots,
      },
      {
        id: "w2-sun",
        date: "2026-08-23",
        dayLabel: "Sun",
        dateLabel: "23 Aug",
        time: "2:00pm",
        setting: "indoor",
        film: films.lunchbox,
      },
    ],
  },
  {
    id: "weekend-3",
    label: "Weekend 3",
    theme: "History, Culture & Heritage",
    accent: "#2E3823",
    screenings: [
      {
        id: "w3-fri",
        date: "2026-08-28",
        dayLabel: "Fri",
        dateLabel: "28 Aug",
        time: "7:00pm",
        setting: "outdoor",
        film: films.lagaan,
      },
      {
        id: "w3-sat",
        date: "2026-08-29",
        dayLabel: "Sat",
        dateLabel: "29 Aug",
        time: "7:00pm",
        setting: "outdoor",
        film: films.marigoldHotel,
      },
      {
        id: "w3-sun-1",
        date: "2026-08-30",
        dayLabel: "Sun",
        dateLabel: "30 Aug",
        time: "2:00pm",
        setting: "indoor",
        film: films.viceroysHouse,
      },
      {
        id: "w3-sun-2",
        date: "2026-08-30",
        dayLabel: "Sun",
        dateLabel: "30 Aug",
        time: "4:30pm",
        setting: "indoor",
        film: films.englishVinglish,
      },
      {
        id: "w3-sun-3",
        date: "2026-08-30",
        dayLabel: "Sun",
        dateLabel: "30 Aug",
        time: "7:00pm",
        setting: "outdoor",
        film: films.bhagatSingh,
      },
    ],
  },
];

export const allScreenings: Screening[] = weekends.flatMap(
  (w) => w.screenings,
);

/** The next screening at or after `now` — used to highlight "Next Up". */
export function nextScreening(now: Date = new Date()): Screening | null {
  const todayISO = now.toISOString().slice(0, 10);
  const upcoming = allScreenings
    .filter((s) => s.date >= todayISO)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  return upcoming[0] ?? null;
}

export function isPast(screening: Screening, now: Date = new Date()) {
  return screening.date < now.toISOString().slice(0, 10);
}
