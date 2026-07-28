"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  breakfastCategories,
  breakfastItems,
  breakfastSlots,
  type BreakfastItem,
} from "@/data/breakfast";
import { formatUGX } from "@/data/menu";
import { site, whatsappLink } from "@/data/site";

interface CartLine {
  /** Composite of item id + chosen options, so two different combos stay separate. */
  key: string;
  itemId: string;
  name: string;
  price: number;
  variablePrice: boolean;
  selections: Record<string, string>;
  qty: number;
}

type Fulfilment = "pickup" | "delivery";

interface Pin {
  lat: number;
  lng: number;
  accuracy: number;
}

type GeoState = "idle" | "locating" | "denied" | "unavailable";

const STORAGE_KEY = "curryleaf.breakfast.cart";

function mapsPinUrl(pin: Pin) {
  return `https://maps.google.com/?q=${pin.lat.toFixed(6)},${pin.lng.toFixed(6)}`;
}

function lineKey(item: BreakfastItem, selections: Record<string, string>) {
  const parts = (item.choices ?? []).map((c) => selections[c.label] ?? "");
  return [item.id, ...parts].join("|");
}

export default function BreakfastOrder() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [choices, setChoices] = useState<Record<string, Record<string, string>>>(
    {},
  );
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const [fulfilment, setFulfilment] = useState<Fulfilment>("pickup");
  const [pin, setPin] = useState<Pin | null>(null);
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    date: "",
    time: breakfastSlots[2],
    address: "",
    notes: "",
  });

  // Restore any cart left from a previous visit.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {
      // Ignore unreadable storage — the customer just starts with an empty cart.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage full or blocked — the cart still works for this session.
    }
  }, [cart, hydrated]);

  const total = useMemo(
    () => cart.reduce((sum, l) => sum + l.price * l.qty, 0),
    [cart],
  );
  const itemCount = useMemo(
    () => cart.reduce((sum, l) => sum + l.qty, 0),
    [cart],
  );
  const hasVariablePrice = cart.some((l) => l.variablePrice);

  function selectionFor(item: BreakfastItem) {
    const current = choices[item.id] ?? {};
    const filled: Record<string, string> = {};
    for (const c of item.choices ?? []) {
      filled[c.label] = current[c.label] ?? c.options[0];
    }
    return filled;
  }

  function addItem(item: BreakfastItem) {
    const selections = selectionFor(item);
    const key = lineKey(item, selections);
    setCart((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      }
      return [
        ...prev,
        {
          key,
          itemId: item.id,
          name: item.name,
          price: item.price,
          variablePrice: item.priceMax !== undefined,
          selections,
          qty: 1,
        },
      ];
    });
    setJustAdded(item.id);
    setTimeout(() => setJustAdded((c) => (c === item.id ? null : c)), 1200);
  }

  function changeQty(key: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }

  /** Ask the browser for the customer's position — they approve the prompt themselves. */
  function locateMe() {
    if (!("geolocation" in navigator)) {
      setGeoState("unavailable");
      return;
    }
    setGeoState("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPin({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
        });
        setGeoState("idle");
      },
      (err) => {
        setGeoState(err.code === err.PERMISSION_DENIED ? "denied" : "unavailable");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }

  const canSubmit =
    cart.length > 0 &&
    details.name.trim() !== "" &&
    details.phone.trim() !== "" &&
    details.date !== "" &&
    // Delivery needs somewhere to go — a typed address or a dropped pin.
    (fulfilment === "pickup" || details.address.trim() !== "" || pin !== null);

  function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const lines = cart.map((l) => {
      const opts = Object.entries(l.selections)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      return `• ${l.qty} × ${l.name}${opts ? ` (${opts})` : ""} — ${formatUGX(
        l.price * l.qty,
      )}${l.variablePrice ? " (price varies)" : ""}`;
    });

    const msg = [
      `Hello Bombay Adda! I'd like to order breakfast for ${
        fulfilment === "pickup" ? "PICKUP" : "DELIVERY"
      }.`,
      "",
      "Order:",
      ...lines,
      "",
      `${hasVariablePrice ? "Estimated total" : "Total"}: ${formatUGX(total)}`,
      "",
      `Name: ${details.name}`,
      `Phone: ${details.phone}`,
      `Date: ${details.date}`,
      `${fulfilment === "pickup" ? "Pickup" : "Delivery"} time: ${details.time}`,
      fulfilment === "delivery" && details.address.trim()
        ? `Delivery address: ${details.address}`
        : "",
      fulfilment === "delivery" && pin
        ? `Pin location (±${pin.accuracy}m): ${mapsPinUrl(pin)}`
        : "",
      details.notes ? `Notes: ${details.notes}` : "",
    ]
      .filter((l) => l !== "")
      .join("\n");

    window.open(whatsappLink(msg), "_blank");
  }

  const input =
    "w-full rounded-xl border border-sand bg-ivory px-4 py-3 text-sm outline-none focus:border-saffron";
  const label =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cocoa/60";

  return (
    <div className="mx-auto max-w-content px-5 pb-24 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        {/* Menu */}
        <div>
          {breakfastCategories.map((cat) => {
            const items = breakfastItems.filter((i) => i.category === cat.id);
            if (items.length === 0) return null;
            const isDrinks = cat.id === "drinks";
            return (
              <section key={cat.id} className="mb-14 scroll-mt-28" id={cat.id}>
                <div className="flex items-center gap-4">
                  <h2 className="font-serif text-3xl font-semibold text-leaf-deep">
                    {cat.label}
                  </h2>
                  <div className="h-px flex-1 bg-sand" />
                </div>
                {cat.blurb && (
                  <p className="mt-2 text-sm text-cocoa/60">{cat.blurb}</p>
                )}

                <div
                  className={`mt-6 grid gap-4 ${
                    isDrinks ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
                  }`}
                >
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="flex flex-col rounded-2xl bg-cream p-5 shadow-sm shadow-sand/40 transition-shadow hover:shadow-lg hover:shadow-sand/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-semibold text-cocoa">
                          {item.name}
                        </h3>
                        <p className="flex-none font-serif text-base text-saffron">
                          {item.priceMax
                            ? `${formatUGX(item.price)} – ${formatUGX(
                                item.priceMax,
                              )}`
                            : formatUGX(item.price)}
                        </p>
                      </div>

                      {item.description && (
                        <p className="mt-1.5 text-sm leading-relaxed text-cocoa/65">
                          {item.description}
                        </p>
                      )}

                      {item.includes && (
                        <p className="mt-2 text-xs leading-relaxed text-cocoa/50">
                          {item.includes.join(" · ")}
                        </p>
                      )}

                      {item.choices?.map((c) => (
                        <div key={c.label} className="mt-3">
                          <label
                            htmlFor={`${item.id}-${c.label}`}
                            className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa/50"
                          >
                            {c.label}
                          </label>
                          <select
                            id={`${item.id}-${c.label}`}
                            value={
                              choices[item.id]?.[c.label] ?? c.options[0]
                            }
                            onChange={(e) =>
                              setChoices((prev) => ({
                                ...prev,
                                [item.id]: {
                                  ...(prev[item.id] ?? {}),
                                  [c.label]: e.target.value,
                                },
                              }))
                            }
                            className="w-full rounded-lg border border-sand bg-ivory px-3 py-2 text-sm outline-none focus:border-saffron"
                          >
                            {c.options.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addItem(item)}
                        className={`mt-4 w-full rounded-full py-2.5 text-sm font-semibold transition-all ${
                          justAdded === item.id
                            ? "bg-leaf text-cream"
                            : "bg-saffron text-cocoa hover:bg-saffron-light"
                        }`}
                      >
                        {justAdded === item.id ? "Added ✓" : "Add to Order"}
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Order panel */}
        <form
          onSubmit={submitOrder}
          className="rounded-3xl bg-cream p-6 shadow-lg shadow-sand/40 lg:sticky lg:top-24"
        >
          <h2 className="font-serif text-2xl font-semibold text-leaf-deep">
            Your Order
          </h2>

          {cart.length === 0 ? (
            <p className="mt-4 text-sm text-cocoa/55">
              Nothing added yet. Pick your breakfast from the menu and it will
              appear here.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              <AnimatePresence initial={false}>
                {cart.map((l) => (
                  <motion.li
                    key={l.key}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start justify-between gap-3 border-b border-sand/60 pb-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-cocoa">{l.name}</p>
                      {Object.entries(l.selections).length > 0 && (
                        <p className="text-xs text-cocoa/50">
                          {Object.entries(l.selections)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" · ")}
                        </p>
                      )}
                      <p className="mt-0.5 text-xs text-saffron">
                        {formatUGX(l.price * l.qty)}
                        {l.variablePrice && " (varies)"}
                      </p>
                    </div>
                    <div className="flex flex-none items-center gap-2">
                      <button
                        type="button"
                        onClick={() => changeQty(l.key, -1)}
                        aria-label={`Remove one ${l.name}`}
                        className="h-7 w-7 rounded-full border border-sand text-cocoa/70 transition-colors hover:border-saffron hover:text-cocoa"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-sm">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => changeQty(l.key, 1)}
                        aria-label={`Add one ${l.name}`}
                        className="h-7 w-7 rounded-full border border-sand text-cocoa/70 transition-colors hover:border-saffron hover:text-cocoa"
                      >
                        +
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {cart.length > 0 && (
            <>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm text-cocoa/60">
                  {hasVariablePrice ? "Estimated total" : "Total"} ({itemCount}{" "}
                  {itemCount === 1 ? "item" : "items"})
                </span>
                <span className="font-serif text-2xl text-saffron">
                  {formatUGX(total)}
                </span>
              </div>
              {hasVariablePrice && (
                <p className="mt-1 text-xs text-cocoa/50">
                  Paratha prices vary by filling — our team confirms the final
                  total when they call you back.
                </p>
              )}
            </>
          )}

          {/* Pickup or delivery */}
          <div className="mt-6">
            <span className={label}>How would you like it?</span>
            <div className="grid grid-cols-2 gap-2 rounded-full bg-ivory p-1">
              {(["pickup", "delivery"] as Fulfilment[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFulfilment(f)}
                  aria-pressed={fulfilment === f}
                  className={`rounded-full py-2.5 text-sm font-semibold capitalize transition-colors ${
                    fulfilment === f
                      ? "bg-leaf text-cream"
                      : "text-cocoa/60 hover:text-cocoa"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4">
            <div>
              <label htmlFor="b-name" className={label}>
                Full name
              </label>
              <input
                id="b-name"
                required
                value={details.name}
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                className={input}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="b-phone" className={label}>
                Phone number
              </label>
              <input
                id="b-phone"
                required
                type="tel"
                value={details.phone}
                onChange={(e) =>
                  setDetails({ ...details, phone: e.target.value })
                }
                className={input}
                placeholder="+256 7xx xxx xxx"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="b-date" className={label}>
                  Date
                </label>
                <input
                  id="b-date"
                  required
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={details.date}
                  onChange={(e) =>
                    setDetails({ ...details, date: e.target.value })
                  }
                  className={input}
                />
              </div>
              <div>
                <label htmlFor="b-time" className={label}>
                  {fulfilment === "pickup" ? "Pickup time" : "Delivery time"}
                </label>
                <select
                  id="b-time"
                  value={details.time}
                  onChange={(e) =>
                    setDetails({ ...details, time: e.target.value })
                  }
                  className={input}
                >
                  {breakfastSlots.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {fulfilment === "delivery" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <label htmlFor="b-address" className={label}>
                    Delivery address
                  </label>
                  <textarea
                    id="b-address"
                    rows={2}
                    value={details.address}
                    onChange={(e) =>
                      setDetails({ ...details, address: e.target.value })
                    }
                    className={input}
                    placeholder="Building, street and area — plus a landmark if it helps"
                  />

                  {/* Exact pin — far more reliable than a written address for riders. */}
                  <div className="mt-3 rounded-xl border border-sand bg-ivory p-3">
                    {pin ? (
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wider text-leaf">
                            📍 Location pinned
                          </p>
                          <p className="mt-1 text-xs text-cocoa/60">
                            {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)} · accurate
                            to about {pin.accuracy}m
                          </p>
                          <a
                            href={mapsPinUrl(pin)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-xs font-semibold text-saffron underline"
                          >
                            Check the pin on the map
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPin(null)}
                          className="flex-none text-xs text-cocoa/50 underline hover:text-cocoa"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={locateMe}
                          disabled={geoState === "locating"}
                          className="w-full rounded-full border border-leaf py-2.5 text-sm font-semibold text-leaf transition-colors hover:bg-leaf hover:text-cream disabled:opacity-50"
                        >
                          {geoState === "locating"
                            ? "Finding you…"
                            : "📍 Pin my exact location"}
                        </button>
                        <p className="mt-2 text-xs text-cocoa/50">
                          {geoState === "denied"
                            ? "Location access was blocked. Allow it in your browser settings, or just type the address above."
                            : geoState === "unavailable"
                              ? "We couldn't get your location. Please type the address above instead."
                              : "Sends our rider an exact map pin — the fastest way to find you."}
                        </p>
                      </>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-cocoa/50">
                    We deliver to {site.delivery.areas}. {site.delivery.note}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="b-notes" className={label}>
                Notes (allergies, spice level, instructions)
              </label>
              <textarea
                id="b-notes"
                rows={2}
                value={details.notes}
                onChange={(e) =>
                  setDetails({ ...details, notes: e.target.value })
                }
                className={input}
                placeholder="Anything we should know?"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 w-full rounded-full bg-leaf py-4 font-semibold text-cream transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send Order via WhatsApp
          </button>
          {cart.length === 0 ? (
            <p className="mt-3 text-center text-xs text-cocoa/50">
              Add at least one item to send your order.
            </p>
          ) : (
            fulfilment === "delivery" &&
            !details.address.trim() &&
            !pin && (
              <p className="mt-3 text-center text-xs text-cocoa/50">
                Add a delivery address or pin your location.
              </p>
            )
          )}
          <p className="mt-3 text-xs text-cocoa/50">
            Your order opens in WhatsApp so you can send it straight to our
            team. We confirm the {fulfilment === "pickup" ? "pickup" : "delivery"}{" "}
            time and total when we reply.
          </p>
        </form>
      </div>
    </div>
  );
}
