"use client";

import { motion, useReducedMotion } from "framer-motion";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const features = [
  {
    title: "Finest Chefs",
    text: "Indian chefs cooking the food of home — tandoor, karahi and dum, done properly.",
    icon: (
      // Chef's hat
      <svg viewBox="0 0 48 48" className="h-10 w-10" {...stroke}>
        <path d="M16 20a7 7 0 1 1 2.5-13.5 8 8 0 0 1 11 0A7 7 0 1 1 32 20v8H16v-8z" />
        <path d="M16 32h16M18 36h12M20 20v6M24 20v6M28 20v6" />
      </svg>
    ),
  },
  {
    title: "Warm Ambience",
    text: "A garden home in Lubowa — sunlit verandas, hand-painted art and the smell of the tandoor.",
    icon: (
      // Indian arch doorway with hanging lamp
      <svg viewBox="0 0 48 48" className="h-10 w-10" {...stroke}>
        <path d="M10 42V22c0-8 6-14 14-14s14 6 14 14v20" />
        <path d="M16 42V24c0-5 3.5-9 8-9s8 4 8 9v18M6 42h36" />
        <path d="M24 15v3m0 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
      </svg>
    ),
  },
  {
    title: "Pickup & Delivery",
    text: "Order ahead on WhatsApp — collect it hot, or have it brought to your door.",
    icon: (
      // Takeaway bag with steam
      <svg viewBox="0 0 48 48" className="h-10 w-10" {...stroke}>
        <path d="M12 18h24l-2.5 24h-19L12 18z" />
        <path d="M18 22v-6a6 6 0 0 1 12 0v6" />
        <path d="M21 30c0-2 6-2 6 0s-6 2-6 4 6 2 6 0" />
      </svg>
    ),
  },
  {
    title: "Authentic Cuisines",
    text: "Recipes from across India — Punjabi classics, coastal curries and street-food favourites.",
    icon: (
      // Mortar & pestle with spice sprigs
      <svg viewBox="0 0 48 48" className="h-10 w-10" {...stroke}>
        <path d="M10 22h28a14 14 0 0 1-28 0z" />
        <path d="M18 36h12M16 40h16M20 22 34 8M34 8l3 3" />
        <path d="M10 14c2-3 6-3 8 0-2 3-6 3-8 0zM40 20c-1-3 2-6 5-5 0 3-2 5-5 5z" />
      </svg>
    ),
  },
];

export default function FeatureIcons() {
  const reduce = useReducedMotion();
  return (
    <section className="border-y border-sand/60 bg-cream py-16">
      <div className="mx-auto grid max-w-content gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group text-center"
          >
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              {/* Dashed ring that spins up on hover */}
              <div className="absolute inset-0 rounded-full border border-dashed border-saffron/50 transition-transform duration-[1200ms] ease-out group-hover:rotate-[120deg] motion-reduce:transition-none" />
              <div className="absolute inset-1.5 rounded-full bg-ivory transition-colors duration-500 group-hover:bg-saffron/10" />
              <span className="relative text-leaf transition-all duration-500 group-hover:-translate-y-1 group-hover:text-saffron">
                {f.icon}
              </span>
            </div>
            <h3 className="mt-5 font-serif text-xl font-semibold text-cocoa">
              {f.title}
            </h3>
            <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-cocoa/65">
              {f.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
