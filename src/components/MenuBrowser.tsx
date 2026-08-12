"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  categories,
  formatUGX,
  type Dish,
  type CategoryId,
  type Dietary,
} from "@/data/menu";
import SpiceLevel from "./SpiceLevel";
import DietaryBadge from "./DietaryBadge";

type DietFilter = "all" | Dietary | "gluten-free" | "dairy-free";

const dietFilters: { id: DietFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "veg", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "non-veg", label: "Non-Veg" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
];

export default function MenuBrowser({ dishes }: { dishes: Dish[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [diet, setDiet] = useState<DietFilter>("all");
  const [selected, setSelected] = useState<Dish | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dishes.filter((d) => {
      if (category !== "all" && d.category !== category) return false;
      if (diet === "veg" && d.dietary === "non-veg") return false;
      if (diet === "vegan" && d.dietary !== "vegan") return false;
      if (diet === "non-veg" && d.dietary !== "non-veg") return false;
      if (diet === "gluten-free" && !d.glutenFree) return false;
      if (diet === "dairy-free" && !d.dairyFree) return false;
      if (
        q &&
        !d.name.toLowerCase().includes(q) &&
        !d.description.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [dishes, query, category, diet]);

  const grouped = useMemo(() => {
    return categories
      .map((c) => ({
        ...c,
        items: filtered.filter((d) => d.category === c.id),
      }))
      .filter((c) => c.items.length > 0);
  }, [filtered]);

  return (
    <div className="mx-auto max-w-content px-5 pb-24 lg:px-8">
      {/* Controls */}
      <div className="sticky top-[68px] z-30 -mx-5 border-b border-sand/50 bg-white/95 px-5 py-4 backdrop-blur-md lg:-mx-8 lg:px-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes — try “paneer”, “biryani”, “tandoori”…"
          aria-label="Search dishes"
          className="w-full rounded-full border border-sand/60 bg-white px-6 py-3.5 text-sm outline-none placeholder:text-cocoa/40 focus:border-saffron"
        />
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCategory("all")}
            className={`flex-none rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              category === "all"
                ? "border border-leaf bg-leaf text-cream"
                : "border border-sand/60 bg-white text-cocoa/70 hover:bg-leaf/5 hover:border-leaf/30"
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(category === c.id ? "all" : c.id)}
              className={`flex-none rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                category === c.id
                  ? "bg-leaf text-cream"
                  : "border border-sand/60 bg-white text-cocoa/70 hover:bg-leaf/5 hover:border-leaf/30"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {dietFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setDiet(f.id)}
              className={`flex-none rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                diet === f.id
                  ? "border-saffron bg-saffron/15 text-cocoa"
                  : "border-sand/60 bg-white text-cocoa/60 hover:border-saffron/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {grouped.length === 0 && (
        <p className="py-20 text-center text-cocoa/60">
          No dishes match — try clearing a filter or a different search.
        </p>
      )}

      {grouped.map((group) => (
        <section key={group.id} className="mt-14">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-3xl font-semibold text-leaf-deep">
              {group.label}
            </h2>
            <div className="h-px flex-1 bg-sand" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {group.items.map((d, i) => (
              <motion.article
                key={d.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              >
                <button
                  type="button"
                  onClick={() => setSelected(d)}
                  aria-haspopup="dialog"
                  className="group w-full rounded-2xl border border-t-4 border-leaf/25 bg-leaf/10 p-6 text-left shadow-sm shadow-leaf/10 transition-all hover:bg-leaf/[0.16] hover:shadow-lg hover:shadow-leaf/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl font-semibold text-cocoa">
                      {d.name}
                    </h3>
                    <p className="flex-none font-serif text-lg text-saffron">
                      {formatUGX(d.price)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa/65">
                    {d.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <DietaryBadge dietary={d.dietary} />
                    <SpiceLevel level={d.spice} />
                    {d.containsNuts && (
                      <span className="text-[0.65rem] uppercase tracking-wider text-cocoa/50">
                        Contains nuts
                      </span>
                    )}
                    {d.glutenFree && (
                      <span className="text-[0.65rem] uppercase tracking-wider text-cocoa/50">
                        Gluten-free
                      </span>
                    )}
                  </div>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-leaf-deep opacity-70 transition-opacity group-hover:opacity-100">
                    View details →
                  </span>
                </button>
              </motion.article>
            ))}
          </div>
        </section>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-cocoa/40 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/60 bg-white shadow-xl shadow-cocoa/20 sm:rounded-3xl"
            >
              {selected.image && (
                <div className="relative h-56 w-full">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 32rem"
                    className="object-cover"
                    unoptimized={!selected.image.startsWith("/")}
                  />
                </div>
              )}
              <div className="max-h-[70vh] overflow-y-auto p-6">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/90 text-cocoa shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                >
                  ✕
                </button>
                <p className="text-xs uppercase tracking-[0.3em] text-saffron">
                  {categories.find((c) => c.id === selected.category)?.label}
                </p>
                <div className="mt-2 flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold text-cocoa">
                    {selected.name}
                  </h3>
                  <p className="flex-none font-serif text-xl text-saffron">
                    {formatUGX(selected.price)}
                  </p>
                </div>
                <p className="mt-3 leading-relaxed text-cocoa/70">
                  {selected.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <DietaryBadge dietary={selected.dietary} />
                  <SpiceLevel level={selected.spice} />
                  {selected.containsNuts && (
                    <span className="text-[0.65rem] uppercase tracking-wider text-cocoa/50">
                      Contains nuts
                    </span>
                  )}
                  {selected.glutenFree && (
                    <span className="text-[0.65rem] uppercase tracking-wider text-cocoa/50">
                      Gluten-free
                    </span>
                  )}
                  {selected.dairyFree && (
                    <span className="text-[0.65rem] uppercase tracking-wider text-cocoa/50">
                      Dairy-free
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
