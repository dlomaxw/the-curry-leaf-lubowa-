"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";
import SpinText from "./SpinText";
import RotatingSeal from "./RotatingSeal";
import FallingSpices from "./FallingSpices";

// Deterministic pseudo-random fine dust particles (stable between server/client).
function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const seed2 = (i * 7919 + 104729) % 233280;
        const r2 = seed2 / 233280;
        return {
          left: `${(r * 100).toFixed(2)}%`,
          top: `${(20 + r2 * 70).toFixed(2)}%`,
          size: 2 + Math.round(r2 * 3),
          duration: 6 + r * 8,
          delay: r2 * 6,
        };
      }),
    [count],
  );
}

const heroWords: { text: string; accent?: boolean }[] = [
  { text: "The" },
  { text: "Soul" },
  { text: "of" },
  { text: "India," },
  { text: "Served", accent: true },
  { text: "in", accent: true },
  { text: "Kampala", accent: true },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const particles = useParticles(18);
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const bgY = useTransform(scrollY, [0, 800], [0, 120]);

  // Flatten the headline into per-word/per-letter spans with a running
  // index so the whole line reveals letter by letter in reading order.
  const heroChars = useMemo(() => {
    let i = 0;
    return heroWords.map((w) => ({
      ...w,
      chars: Array.from(w.text).map((ch) => ({ ch, index: i++ })),
    }));
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cocoa">
      <motion.div
        style={reduce ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0 overflow-hidden opacity-40"
      >
        <iframe
          src="https://www.youtube-nocookie.com/embed/LdbBAiJb9NE?autoplay=1&mute=1&loop=1&playlist=LdbBAiJb9NE&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&disablekb=1&vq=hd1080"
          title=""
          aria-hidden="true"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] w-full -translate-x-1/2 -translate-y-1/2 border-0 sm:min-h-full sm:w-[177.78vh] sm:min-w-full"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa/70 via-cocoa/50 to-cocoa" />
      {/* warm saffron glow */}
      <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/15 blur-[120px]" />

      {!reduce &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-saffron-light/60"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [-14, 14], opacity: [0.15, 0.7, 0.15] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Star anise, cinnamon, chilli, cardamom and curry leaf drifting down */}
      <FallingSpices count={9} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="relative mb-8 flex justify-center"
        >
          {/* Slowly rotating text seal framing the mark */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
            <RotatingSeal size={420} color="rgba(224, 180, 87, 0.3)" />
          </div>
          <Image
            src="/images/logo-gold.png"
            alt="The Curry Leaf — Indian Kitchen & Social House"
            width={792}
            height={426}
            priority
            className="relative h-28 w-auto drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] sm:h-36 lg:h-40"
          />
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs uppercase tracking-[0.4em] text-saffron-light"
        >
          Lubowa · Kampala
        </motion.p>

        <h1
          aria-label="The Soul of India, Served in Kampala"
          className="mt-6 whitespace-nowrap font-serif font-semibold leading-[1.05] text-cream"
          style={{ fontSize: "clamp(1.35rem, 5.4vw, 4.5rem)" }}
        >
          {heroChars.map((w, wi) => (
            <span
              key={wi}
              aria-hidden
              className={`mr-[0.28em] inline-block ${w.accent ? "text-saffron-light" : ""}`}
            >
              {w.chars.map(({ ch, index }) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  style={{ transformPerspective: 600 }}
                  initial={reduce ? false : { opacity: 0, y: 24, rotateX: -80 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.035,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg"
        >
          Experience authentic Indian flavours, premium hospitality and
          unforgettable dining at The Curry Leaf, Lubowa.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/menu"
            className="rounded-full bg-saffron px-8 py-3.5 font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
          >
            <SpinText text="Explore the Menu" />
          </Link>
          <Link
            href="/reservations"
            className="rounded-full border border-cream/40 px-8 py-3.5 font-semibold text-cream transition-colors hover:border-saffron-light hover:text-saffron-light"
          >
            <SpinText text="Reserve a Table" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/60"
        aria-hidden
      >
        <motion.svg
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-none stroke-current"
        >
          <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
