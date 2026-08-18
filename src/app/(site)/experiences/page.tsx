import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { formatUGX, sundayBuffet } from "@/data/menu";

export const metadata: Metadata = {
  title: "Dining Experiences — The Curry Leaf, Lubowa",
  description:
    "Family feasts, corporate dining and private celebrations at The Curry Leaf, Lubowa. Sharing platters, business pizza combos and customised event packages.",
};

const sections = [
  {
    id: "family",
    eyebrow: "For the Whole Table",
    title: "Family Dining",
    accent: "text-saffron",
    intro:
      "Sunday afternoons in the garden, platters built for sharing, and a kitchen that loves feeding families. Bring everyone.",
    packages: [
      {
        name: "Family Sharing Platters",
        detail:
          "Tandoori Sharing Platters built for the table — the Maharaja Mixed Grill Platter (UGX 148,000) or the Vegetarian Tandoori Platter (UGX 78,000) — plus à la carte curries, biryanis and fresh naan for everyone. Available daily.",
      },
      {
        name: sundayBuffet.name,
        detail: `${sundayBuffet.time}. Unlimited Indian feast with a wide selection of curries, fresh naan and rice, desserts and masala chai. Adults ${formatUGX(sundayBuffet.adults)}, children under 12 ${formatUGX(sundayBuffet.children)}.`,
      },
      {
        name: "Family Celebration Package",
        detail:
          "Birthdays and milestones with a customised sharing menu, cake arrangements and a reserved family area. Tell us your date and we'll build it around you.",
      },
    ],
    formKind: "family dining",
    extraFieldLabel: "Occasion (birthday, celebration…)",
  },
  {
    id: "corporate",
    eyebrow: "For Teams & Clients",
    title: "Corporate Dining",
    accent: "text-leaf",
    intro:
      "Minutes off Entebbe Road, with quiet rooms for working lunches and a menu that impresses clients without slowing the afternoon down.",
    packages: [
      {
        name: "Business Pizza Lunch",
        detail:
          "Any 2 pizzas, 2 soft drinks and 2 ice creams — UGX 85,000. Perfect for a fast working lunch for two.",
      },
      {
        name: "Executive Lunch Menu",
        detail:
          "A fast, complete Indian meal for the table: a curry selection, rice, naan, accompaniments, dessert and masala chai. Great for meetings, served daily.",
      },
      {
        name: "Client Entertainment & Team Dinners",
        detail:
          "Reserved dining areas, customised set menus, and billing arrangements for approved corporate accounts. Send us your guest count and budget for a quotation.",
      },
    ],
    formKind: "corporate dining",
    extraFieldLabel: "Company name",
  },
  {
    id: "private",
    eyebrow: "For the Moments That Matter",
    title: "Private Celebrations",
    accent: "text-chilli",
    intro:
      "Anniversaries, engagements, graduations — a private room, a menu written for the occasion, and a team that sweats the details.",
    packages: [
      {
        name: "Private Dining Room Experience",
        detail:
          "An intimate space of your own with a customised chef's menu and dedicated service.",
      },
      {
        name: "Birthday & Anniversary Dinners",
        detail:
          "Decorations, cake and special arrangements on request — tell us who you're celebrating.",
      },
      {
        name: "Custom Chef's Menu",
        detail:
          "Sit with our kitchen and design a bespoke tasting menu for your event, from tandoor specialities to regional classics.",
      },
    ],
    formKind: "private event",
    extraFieldLabel: "Event type (birthday, engagement…)",
  },
];

export default function ExperiencesPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-content px-5 py-12 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.35em] text-saffron">
          More Than a Meal
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-leaf-deep">
          Dining Experiences
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-cocoa/70">
          Three ways to make The Curry Leaf yours — each with its own menu,
          space and a team to plan it with you.
        </p>
      </div>

      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="scroll-mt-24 py-16"
        >
          <div className="mx-auto grid max-w-content gap-10 px-5 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <p className={`text-xs uppercase tracking-[0.35em] ${s.accent}`}>
                {s.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-cocoa">
                {s.title}
              </h2>
              <p className="mt-4 leading-relaxed text-cocoa/70">{s.intro}</p>
              <div className="mt-8 space-y-5">
                {s.packages.map((p) => (
                  <div key={p.name} className="border-l-2 border-sand pl-5">
                    <h3 className="font-serif text-xl font-semibold text-cocoa">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cocoa/65">
                      {p.detail}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-cocoa/5 backdrop-blur-xl sm:p-8">
                <h3 className="font-serif text-2xl font-semibold text-leaf-deep">
                  Request a {s.title} Proposal
                </h3>
                <EnquiryForm kind={s.formKind} extraFieldLabel={s.extraFieldLabel} />
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
