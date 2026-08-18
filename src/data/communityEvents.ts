// One-off community events The Curry Leaf is taking part in.

export interface CommunityEvent {
  id: string;
  name: string;
  edition?: string;
  tagline: string;
  date: string;
  time: string;
  venue: string;
  highlights: string[];
}

export const communityEvents: CommunityEvent[] = [
  {
    id: "lubowa-community-day",
    name: "Lubowa Community Day",
    edition: "4th Edition",
    tagline: "Our Community, One Big Family",
    date: "Saturday, 29 August 2026",
    time: "Starting 7:30 AM",
    venue: "African Bible University Playground",
    highlights: [
      "Curry Leaf food stall",
      "Tasting table — sample some of our dishes",
      "Curry Leaf marketing tent with loyalty cards & promotions",
      "Proud sponsor — providing food for event volunteers",
    ],
  },
];
