"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

/** Small hand-drawn-style spice icons used as decorative falling elements. */
function StarAnise({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 360) / 8;
          return (
            <path
              key={i}
              d="M20 20 L20 5 Q23 10 20 14 Q17 10 20 5 Z"
              transform={`rotate(${a} 20 20)`}
            />
          );
        })}
        <circle cx="20" cy="20" r="3" />
      </g>
    </svg>
  );
}

function CinnamonStick({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M9 6c0 8 22 4 22 12s-22 4-22 12" />
        <path d="M9 6c3 1 3 3 0 4M31 30c-3-1-3-3 0-4" />
      </g>
    </svg>
  );
}

function ChiliPod({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 8c2-2 4-2 4 1 4 1 12 8 12 17 0 5-4 8-8 6-6-3-10-11-10-17 0-3 0-5 2-7z" />
        <path d="M14 8c-2-1-4-1-5 1" />
      </g>
    </svg>
  );
}

function Cardamom({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M12 15c0-5 4-9 8-9s8 4 8 9-4 12-8 12-8-7-8-12z" />
        <path d="M12 15h16M14 19h12M16 23h8" />
      </g>
    </svg>
  );
}

function CurryLeafSprig({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M6 32c8-2 22-10 28-26" />
        {[6, 12, 18, 24].map((t, i) => (
          <ellipse
            key={i}
            cx={8 + t}
            cy={30 - t}
            rx="4"
            ry="2.4"
            transform={`rotate(-40 ${8 + t} ${30 - t})`}
          />
        ))}
      </g>
    </svg>
  );
}

const ICONS = [StarAnise, CinnamonStick, ChiliPod, Cardamom, CurryLeafSprig];

interface Piece {
  Icon: (typeof ICONS)[number];
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotateDir: number;
  color: string;
}

/** Deterministic pseudo-random so the sequence matches between server and client. */
function seeded(i: number, salt: number) {
  const s = (i * 9301 + salt) % 233280;
  return s / 233280;
}

export default function FallingSpices({
  count = 10,
  colorClass = "text-saffron-light/70",
  className = "",
}: {
  count?: number;
  colorClass?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r1 = seeded(i, 49297);
        const r2 = seeded(i, 104729);
        const r3 = seeded(i, 15485863);
        return {
          Icon: ICONS[i % ICONS.length],
          left: `${(r1 * 96).toFixed(2)}%`,
          size: 16 + Math.round(r2 * 14),
          duration: 16 + r1 * 14,
          delay: -(r2 * 26),
          drift: (r3 - 0.5) * 60,
          rotateDir: i % 2 === 0 ? 1 : -1,
          color: colorClass,
        };
      }),
    [count, colorClass],
  );

  if (reduce) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute top-[-10%] ${p.color}`}
          style={{ left: p.left }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, p.drift, 0],
            rotate: [0, 180 * p.rotateDir, 360 * p.rotateDir],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            opacity: { duration: p.duration, times: [0, 0.1, 0.85, 1], repeat: Infinity },
          }}
        >
          <p.Icon size={p.size} />
        </motion.div>
      ))}
    </div>
  );
}
