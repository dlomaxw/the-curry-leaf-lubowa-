"use client";

import { useState } from "react";
import Image from "next/image";
import type { Film } from "@/data/filmFestival";

/** Click-to-play trailer — loads only a thumbnail until tapped, then swaps
 * in the real YouTube embed. Keeps 11 videos on one page from all trying to
 * load at once. */
export default function FilmTrailer({ film }: { film: Film }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-cocoa">
        <iframe
          src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1`}
          title={`${film.title} — official trailer`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play trailer for ${film.title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl"
      style={{ backgroundColor: film.accent }}
    >
      <Image
        src={`https://img.youtube.com/vi/${film.youtubeId}/hqdefault.jpg`}
        alt={`${film.title} trailer thumbnail`}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 380px"
        className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 via-transparent to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/85 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-cocoa">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute bottom-2 right-2 rounded-full bg-cocoa/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-cream">
        Watch Trailer
      </span>
    </button>
  );
}
