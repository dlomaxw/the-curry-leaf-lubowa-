"use client";

import { useRef, type ReactNode } from "react";

/** Horizontal snap-scroll carousel with prev/next arrows, matching the
    "Live Matches" style — a row of equal-width cards you flick through. */
export default function Carousel({
  children,
  cardWidthClass = "w-72",
}: {
  children: ReactNode;
  cardWidthClass?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 16 : 300;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="absolute -top-14 right-0 hidden gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand/60 bg-white text-cocoa transition-colors hover:border-saffron/60 hover:text-saffron"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand/60 bg-white text-cocoa transition-colors hover:border-saffron/60 hover:text-saffron"
        >
          ›
        </button>
      </div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div
                key={i}
                data-carousel-card
                className={`flex-none snap-start ${cardWidthClass}`}
              >
                {child}
              </div>
            ))
          : (
              <div data-carousel-card className={`flex-none snap-start ${cardWidthClass}`}>
                {children}
              </div>
            )}
      </div>
    </div>
  );
}
