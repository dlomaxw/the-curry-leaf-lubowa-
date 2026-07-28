"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Circular "stamp" of text that spins slowly around the logo — text on an
 * SVG circle path, rotated continuously via Framer Motion. Pure decoration;
 * hidden from screen readers since the wordmark itself carries the name.
 */
export default function RotatingSeal({
  size = 220,
  text = "THE CURRY LEAF RESTAURANT • INDIAN KITCHEN & SOCIAL HOUSE • ",
  color = "#C99528",
  className = "",
  duration = 22,
}: {
  size?: number;
  text?: string;
  color?: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const r = size / 2 - 14;
  const pathId = "seal-path";

  return (
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      aria-hidden
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <path
          id={pathId}
          d={`M ${size / 2}, ${size / 2} m -${r}, 0 a ${r},${r} 0 1,1 ${
            r * 2
          },0 a ${r},${r} 0 1,1 -${r * 2},0`}
        />
      </defs>
      <text
        fill={color}
        fontSize="11.5"
        letterSpacing="2.5"
        style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 600 }}
      >
        <textPath href={`#${pathId}`}>{text}</textPath>
      </text>
    </motion.svg>
  );
}
