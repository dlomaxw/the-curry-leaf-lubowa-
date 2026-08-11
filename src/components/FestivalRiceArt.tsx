"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/** Tricolor rice + star anise — the festival's signature image. Circular
 * frame, glowing tricolor halo and a slow-turning dashed ring match the
 * "plate" visual language used for dishes elsewhere on the site, so this
 * reads as part of the same system rather than a bolted-on banner image. */
export default function FestivalRiceArt() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-square w-full max-w-[22rem]"
    >
      {/* Tricolor glow breathing behind the plate */}
      <motion.div
        animate={
          reduce
            ? undefined
            : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-[60px]"
        style={{
          background:
            "conic-gradient(from 90deg, #A6382766, #FFF9EF66, #53633F66, #FFF9EF66, #A6382766)",
        }}
      />

      {/* Slow-turning dashed ring */}
      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-full border border-dashed border-cream/40"
      />

      {/* The photo itself, gently floating */}
      <motion.div
        animate={reduce ? undefined : { y: [-8, 8] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="relative h-[84%] w-[84%] translate-x-[8%] translate-y-[8%] overflow-hidden rounded-full border-4 border-cream/20 shadow-2xl shadow-cocoa/40"
      >
        <Image
          src="/images/festival/colored-rice-with-star-anise-spice.jpg"
          alt="Rice in the colours of the Indian flag with a star anise at its centre"
          fill
          sizes="(max-width: 1024px) 70vw, 22rem"
          className="object-cover"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
