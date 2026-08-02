"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
      <div className="sticky top-[68px] z-30 -mx-5 bg-ivory/95 px-5 py-4 backdrop-blur-sm lg:-mx-8 lg:px-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes — try “paneer”, “biryani”, “tandoori”…"
          aria-label="Search dishes"
          className="w-full rounded-full border border-sand bg-cream px-6 py-3.5 text-sm outline-none placeholder:text-cocoa/40 focus:border-saffron"
        />
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCategory("all")}
            className={`flex-none rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              category === "all"
                ? "bg-leaf text-cream"
                : "bg-cream text-cocoa/70 hover:bg-sand/50"
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
                  : "bg-cream text-cocoa/70 hover:bg-sand/50"
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
                  : "border-sand text-cocoa/60 hover:border-saffron/60"
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
                className="group rounded-2xl bg-cream p-6 shadow-sm shadow-sand/40 transition-shadow hover:shadow-lg hover:shadow-sand/60"
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
              </motion.article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
