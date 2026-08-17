"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { BookClub } from "@/data/bookClubs";

export default function BookClubCard({ club }: { club: BookClub }) {
  const [coverOpen, setCoverOpen] = useState(false);
  const cover = club.currentRead.cover;

  return (
    <div className="h-full rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg shadow-cocoa/5 backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-cocoa/10">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full border border-saffron/30 bg-saffron/10 text-2xl">
          {club.emoji}
        </span>
        <div>
          <h2 className="font-serif text-2xl font-semibold leading-tight text-leaf-deep">
            {club.name}
          </h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-saffron">
            {club.frequency}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-cocoa/70">
        {club.description}
      </p>

      <div className="mt-6 flex gap-5 rounded-2xl border border-t-4 border-saffron/30 bg-saffron/[0.07] p-5">
        {cover && (
          <button
            type="button"
            onClick={() => setCoverOpen(true)}
            aria-label={`View larger cover of ${club.currentRead.title}`}
            className="group relative aspect-[2/3] w-24 flex-none overflow-hidden rounded-lg shadow-md shadow-cocoa/25 transition-transform hover:-translate-y-0.5 hover:shadow-lg sm:w-28"
          >
            <Image
              src={cover}
              alt={`${club.currentRead.title} cover`}
              fill
              sizes="(max-width: 640px) 6rem, 7rem"
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-cocoa/0 text-[0.6rem] font-semibold uppercase tracking-wider text-cream opacity-0 transition-all group-hover:bg-cocoa/40 group-hover:opacity-100">
              View
            </span>
          </button>
        )}
        <div className="min-w-0">
          <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-saffron">
            {club.currentRead.note}
          </p>
          <p className="mt-2 font-serif text-xl font-semibold leading-snug text-cocoa">
            {club.currentRead.title}
            {club.currentRead.flag && (
              <span className="ml-2">{club.currentRead.flag}</span>
            )}
          </p>
          <p className="text-sm italic text-cocoa/60">
            by {club.currentRead.author}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cocoa/70">
            {club.currentRead.synopsis}
          </p>
        </div>
      </div>

      {club.extraNote && (
        <p className="mt-5 rounded-xl bg-leaf/5 px-4 py-3 text-sm leading-relaxed text-cocoa/65">
          {club.extraNote}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-sand/60 pt-5 text-sm">
        <p className="flex items-center gap-2 text-cocoa/80">
          <span className="text-saffron">📅</span>
          <span>
            <span className="font-semibold text-cocoa">First meeting:</span>{" "}
            {club.firstMeeting}
            {club.meetingTime && ` · ${club.meetingTime}`}
          </span>
        </p>
        <p className="flex items-center gap-2 text-cocoa/80">
          <span className="text-saffron">📍</span>
          <span>{club.location}</span>
        </p>
      </div>

      <AnimatePresence>
        {coverOpen && cover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/70 p-6 backdrop-blur-sm"
            onClick={() => setCoverOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm"
            >
              <button
                type="button"
                onClick={() => setCoverOpen(false)}
                aria-label="Close"
                className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/90 text-cocoa shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              >
                ✕
              </button>
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl shadow-2xl shadow-cocoa/40">
                <Image
                  src={cover}
                  alt={`${club.currentRead.title} cover`}
                  fill
                  sizes="24rem"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center font-serif text-lg font-semibold text-cream">
                {club.currentRead.title}
              </p>
              <p className="text-center text-sm text-cream/70">
                by {club.currentRead.author}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
