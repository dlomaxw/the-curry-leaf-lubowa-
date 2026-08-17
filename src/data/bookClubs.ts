// The Curry Leaf's book clubs — content transcribed from the launch
// announcement. Contact is specific to the book clubs, not the main line.

export const bookClubsIntro = {
  eyebrow: "A New Monthly Tradition",
  heading: "Two New Book Clubs at The Curry Leaf",
  lede:
    "Books have always been a huge part of my life. I grew up between India and the UK, and have since lived in Afghanistan, South Africa and now Uganda. Reading has helped shape my identity, introduced me to different worlds and perspectives, and helped me make sense of the places I've called home.",
  body:
    "So, out of my own love of books, I'm starting two monthly book clubs at The Curry Leaf in Lubowa — each a little different, but both centred around reading, conversation and meeting interesting people.",
  closing:
    "You're very welcome to join one club or both. You don't need to be a literary expert — just curious, open to different perspectives and happy to have a good conversation.",
  tagline:
    "Two book clubs. Two very different reading journeys. One table to gather around.",
};

export interface BookClubRead {
  title: string;
  author: string;
  flag?: string;
  note?: string;
  synopsis: string;
}

export interface BookClub {
  id: string;
  emoji: string;
  name: string;
  frequency: string;
  description: string;
  currentRead: BookClubRead;
  firstMeeting: string;
  meetingTime?: string;
  location: string;
  extraNote?: string;
}

export const bookClubs: BookClub[] = [
  {
    id: "booker-prize",
    emoji: "📖",
    name: "The Booker Prize Book Club",
    frequency: "Last Sunday of every month",
    description:
      "We'll work our way through books recognised by the Booker Prize, reading one book each month before getting together to discuss, critique and debate it over good food, coffee and conversation.",
    currentRead: {
      title: "The Shadow of the Object",
      author: "Chloe Aridjis",
      note: "Longlisted for the 2026 Booker Prize · September read",
      synopsis:
        "The novel follows Flora, who travels to Mexico City to visit relatives and, after an unexpected encounter, finds herself drawn into the strange world of an elderly German collector of pre-cinema objects.",
    },
    firstMeeting: "Sunday, 27 September",
    location: "The Curry Leaf, Lubowa",
  },
  {
    id: "asian-book-club",
    emoji: "🌏",
    name: "The Asian Book Club",
    frequency: "Third Thursday of every month",
    description:
      "A book club dedicated to discovering stories and voices from South and East Asia — from India, Pakistan, Bangladesh and Sri Lanka to China, Japan, Korea, Vietnam and beyond.",
    currentRead: {
      title: "Convenience Store Woman",
      author: "Sayaka Murata",
      flag: "🇯🇵",
      note: "Our first read · around 160 pages",
      synopsis:
        'It follows Keiko, a woman who has worked happily in the same Tokyo convenience store for 18 years, while the people around her seem determined to tell her what a "normal" life should look like. Funny, strange and thought-provoking, it raises fascinating questions about identity, belonging, work, relationships, social expectations and the pressure to fit in.',
    },
    firstMeeting: "Thursday, 17 September",
    meetingTime: "6:30 – 8:30 PM",
    location: "The Curry Leaf, Lubowa",
    extraNote:
      "For the Asian Book Club, we'll choose future books together — bring your recommendations, and at each meeting we can decide what we want to read next.",
  },
];

export const bookClubContact = {
  name: "Ritu Mahendru",
  phone: "0763 679 123",
  phoneDisplay: "+256 763 679123",
  whatsapp: "256763679123",
  note: "Please WhatsApp by text message only.",
};

export function bookClubWhatsappLink(message: string) {
  return `https://wa.me/${bookClubContact.whatsapp}?text=${encodeURIComponent(message)}`;
}
