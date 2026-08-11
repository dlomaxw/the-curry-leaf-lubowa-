"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/** Sheer saffron/green silk drifting in from the top-left behind the
 * festival hero — decorative only, so it's aria-hidden and never competes
 * with the readable content stacked above it. Source photo has a pure
 * black backdrop; `mix-blend-screen` makes black vanish into the section's
 * dark green background while keeping the fabric fully vivid (screen-blend
 * of black is a no-op, so colours never look faded or transparent). */
export default function FestivalFabricBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen"
    >
      <motion.div
        animate={
          reduce ? undefined : { rotate: [0, 2.5, 0], y: [0, 14, 0] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-16 -top-16 h-[34rem] w-[34rem] sm:h-[42rem] sm:w-[42rem]"
      >
        <Image
          src="/images/festival/fabric-tricolor.png"
          alt=""
          fill
          className="object-contain object-left-top"
          sizes="42rem"
        />
      </motion.div>
    </div>
  );
}
