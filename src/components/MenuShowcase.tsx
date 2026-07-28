"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { dishes, formatUGX, categories } from "@/data/menu";
import SpiceLevel from "./SpiceLevel";
import DietaryBadge from "./DietaryBadge";
import SpinText from "./SpinText";

const featured = dishes.filter((d) => d.featured);

function categoryLabel(id: string) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

const IVORY = [244, 235, 221] as const;

/* Blend a dish accent into the warm ivory base so each background stays in
   the brand family instead of turning into a flat block of colour. */
function tint(hex: string, strength: number) {
  const h = hex.replace("#", "");
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mixed = rgb.map((c, i) =>
    Math.round(IVORY[i] + (c - IVORY[i]) * strength),
  );
  return `rgb(${mixed.join(", ")})`;
}

/* Rising steam — soft blurred plumes that drift up and dissipate, so the
   dish reads as freshly out of the kitchen. */
function Steam({ accent }: { accent: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const plumes = [
    { x: "36%", w: 54, delay: 0, dur: 4.4, drift: -26 },
    { x: "50%", w: 70, delay: 1.2, dur: 5.2, drift: 16 },
    { x: "64%", w: 50, delay: 2.2, dur: 4.8, drift: 30 },
    { x: "46%", w: 40, delay: 3.2, dur: 5.6, drift: -12 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {plumes.map((p, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-[50%] blur-lg mix-blend-screen"
          style={{
            left: p.x,
            width: p.w,
            height: p.w * 2.6,
            marginLeft: -p.w / 2,
            background: `linear-gradient(to top, #FFFDF8, #FFF9EFcc 40%, ${accent}33 75%, transparent)`,
          }}
          initial={{ opacity: 0, y: 30, scaleX: 0.5 }}
          animate={{
            opacity: [0, 0.85, 0.5, 0],
            y: [30, -170],
            x: [0, p.drift],
            scaleX: [0.5, 1.6],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* The dish "plate" — a circular photograph floating over an accent glow,
   ringed by a slow-turning dashed orbit and spice dots. Falls back to a
   typographic monogram when no photo exists. */
function Plate({
  accent,
  name,
  image,
  priority = false,
  steam = false,
}: {
  accent: string;
  name: string;
  image?: string;
  priority?: boolean;
  steam?: boolean;
}) {
  const reduce = useReducedMotion();
  const initials = name
    .split(" ")
    .filter((w) => w[0] === w[0]?.toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className="relative flex aspect-square w-full max-w-[26rem] items-center justify-center">
      <div
        className="absolute inset-0 rounded-full blur-[70px] transition-colors duration-700"
        style={{ background: `${accent}40` }}
      />
      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-dashed"
        style={{ borderColor: `${accent}55` }}
      />
      <motion.div
        animate={reduce ? undefined : { y: [-6, 6] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="relative h-[82%] w-[82%] overflow-hidden rounded-full border-4 shadow-2xl"
        style={{ borderColor: `${accent}66`, boxShadow: `0 30px 60px -20px ${accent}66` }}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 60vw, 26rem"
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `radial-gradient(circle at 35% 30%, #FFF9EF, #F4EBDD 60%, ${accent}22)`,
            }}
          >
            <span
              className="font-serif text-7xl font-semibold"
              style={{ color: accent }}
            >
              {initials}
            </span>
          </div>
        )}
        {/* Steam drifts up off the food, clipped to the plate. Only the
            visible plate animates it, so hidden plates cost nothing. */}
        {steam && <Steam accent={accent} />}
        {/* soft sheen over the photo */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-cream/25" />
      </motion.div>
      {[0, 72, 144, 216, 288].map((deg) => (
        <span
          key={deg}
          className="absolute h-2 w-2 rounded-full"
          style={{
            background: accent,
            top: `${50 - 47 * Math.cos((deg * Math.PI) / 180)}%`,
            left: `${50 + 47 * Math.sin((deg * Math.PI) / 180)}%`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function MenuShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = refs.current.indexOf(e.target as HTMLDivElement);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const accent = featured[active].accent ?? "#C99528";

  return (
    <motion.section
      className="relative"
      animate={{ backgroundColor: tint(accent, 0.19) }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {/* A deeper pool of the same accent behind the plate adds depth. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: `radial-gradient(65% 55% at 30% 50%, ${accent}26, transparent 72%)`,
        }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-content px-5 pt-24 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.35em] text-saffron">
          From Our Kitchen
        </p>
        <h2 className="mt-3 font-serif text-4xl font-semibold text-leaf-deep sm:text-5xl">
          Signatures of the House
        </h2>
      </div>

      {/* Desktop: sticky plate + scrolling details */}
      <div className="relative mx-auto hidden max-w-content gap-8 px-8 lg:grid lg:grid-cols-[55%_45%]">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          {/* All plates stay mounted and crossfade — no queued exit animation,
              so rapid scrolling stays fluid. */}
          <div className="relative aspect-square w-full max-w-[26rem]">
            {featured.map((d, i) => (
              <motion.div
                key={d.id}
                className="absolute inset-0"
                initial={false}
                animate={
                  reduce
                    ? { opacity: i === active ? 1 : 0 }
                    : {
                        opacity: i === active ? 1 : 0,
                        scale: i === active ? 1 : 0.88,
                        rotate: i === active ? 0 : i < active ? -6 : 6,
                      }
                }
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: i === active ? "auto" : "none" }}
                aria-hidden={i !== active}
              >
                <Plate
                  accent={d.accent ?? "#C99528"}
                  name={d.name}
                  image={d.image}
                  priority={i === 0}
                  steam={i === active}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          {featured.map((d, i) => (
            <div
              key={d.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="flex min-h-screen flex-col justify-center py-16"
            >
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: d.accent }}
              >
                {categoryLabel(d.category)}
              </p>
              <h3
                className="mt-4 font-serif text-5xl font-semibold text-cocoa"
                aria-label={d.name}
              >
                {/* Letter-by-letter rise-and-flip, word by word so lines wrap cleanly */}
                {d.name.split(" ").map((word, wi) => (
                  <span key={wi} className="mr-3 inline-block whitespace-nowrap">
                    {Array.from(word).map((ch, ci) => (
                      <motion.span
                        key={ci}
                        aria-hidden
                        className="inline-block"
                        style={{ transformPerspective: 600 }}
                        initial={
                          reduce ? false : { opacity: 0, y: 26, rotateX: -80 }
                        }
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: (wi * 4 + ci) * 0.035,
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-cocoa/70">
                {d.description}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <DietaryBadge dietary={d.dietary} />
                <SpiceLevel level={d.spice} />
              </div>
              <motion.p
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 font-serif text-3xl text-saffron"
              >
                {formatUGX(d.price)}
              </motion.p>
              <Link
                href="/menu"
                className="mt-8 inline-block w-fit rounded-full border border-leaf px-7 py-3 text-sm font-semibold text-leaf transition-colors hover:bg-leaf hover:text-cream"
              >
                <SpinText text="View the Full Menu" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: swipeable cards */}
      <div className="relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-14 lg:hidden">
        {featured.map((d) => (
          <div
            key={d.id}
            className="w-[85%] flex-none snap-center rounded-3xl p-6 shadow-lg shadow-sand/40"
            style={{ backgroundColor: tint(d.accent ?? "#C99528", 0.16) }}
          >
            <div className="mx-auto w-2/3">
              <Plate
                accent={d.accent ?? "#C99528"}
                name={d.name}
                image={d.image}
                steam
              />
            </div>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.25em]" style={{ color: d.accent }}>
              {categoryLabel(d.category)}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-cocoa">
              {d.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cocoa/70">
              {d.description}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <DietaryBadge dietary={d.dietary} />
              <SpiceLevel level={d.spice} />
            </div>
            <p className="mt-4 font-serif text-2xl text-saffron">
              {formatUGX(d.price)}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
