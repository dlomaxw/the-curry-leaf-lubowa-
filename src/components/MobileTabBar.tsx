"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const tabs = [
  {
    href: "/",
    label: "Home",
    exact: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10v9h12v-9" />
      </svg>
    ),
  },
  {
    href: "/menu",
    label: "Menu",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M7 3v7M7 3c-1.5 0-2.5 1.5-2.5 3S5.5 9.5 7 9.5M7 3c1.5 0 2.5 1.5 2.5 3S8.5 9.5 7 9.5M7 9.5V21" />
        <path d="M17 3c-1.7 0-3 2-3 5s1.3 5 3 5v8" />
      </svg>
    ),
  },
  {
    href: "/breakfast",
    label: "Breakfast",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" />
        <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
        <path d="M8 3c-.7.7-.7 1.3 0 2M12 3c-.7.7-.7 1.3 0 2" />
      </svg>
    ),
  },
  {
    href: "/reservations",
    label: "Reserve",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M8 3v4M16 3v4" />
      </svg>
    ),
  },
];

const moreLinks = [
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href);
}

export default function MobileTabBar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => setMoreOpen(false), [pathname]);

  const moreActive = moreLinks.some((l) => pathname.startsWith(l.href));

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-sand/70 bg-cream/95 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex max-w-content items-stretch justify-between px-1">
          {tabs.map((t) => {
            const active = isActive(pathname, t.href, t.exact);
            return (
              <Link
                key={t.href}
                href={t.href}
                className="flex flex-1 flex-col items-center gap-1 py-2.5"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    active ? "bg-saffron/15 text-saffron" : "text-cocoa/50"
                  }`}
                >
                  {t.icon}
                </span>
                <span
                  className={`text-[0.65rem] font-medium ${
                    active ? "text-saffron" : "text-cocoa/50"
                  }`}
                >
                  {t.label}
                </span>
              </Link>
            );
          })}
          <button
            onClick={() => setMoreOpen(true)}
            aria-label="More"
            aria-expanded={moreOpen}
            className="flex flex-1 flex-col items-center gap-1 py-2.5"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                moreActive || moreOpen
                  ? "bg-saffron/15 text-saffron"
                  : "text-cocoa/50"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
                <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
                <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
                <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span
              className={`text-[0.65rem] font-medium ${
                moreActive || moreOpen ? "text-saffron" : "text-cocoa/50"
              }`}
            >
              More
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
              className="fixed inset-0 z-40 bg-cocoa/50 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-cream p-6 pb-10 shadow-2xl lg:hidden"
              style={{
                paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))",
              }}
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-sand" />
              <div className="flex flex-col gap-1">
                {moreLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`rounded-xl px-4 py-3 font-serif text-xl ${
                      pathname.startsWith(l.href)
                        ? "bg-saffron/10 text-saffron"
                        : "text-leaf-deep"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
