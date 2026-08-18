"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/bar", label: "Bar" },
  { href: "/breakfast", label: "Breakfast" },
  { href: "/reservations", label: "Reservations" },
  { href: "/events", label: "Events" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Only the homepage has a dark hero behind a transparent bar.
  const transparent = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-white/70 backdrop-blur-md border-b border-white/50 shadow-[0_1px_0_rgba(83,99,63,0.08)]"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" aria-label="The Curry Leaf — home" className="relative block">
          {/* Two colourways: gold reads on the dark hero, deep green on cream. */}
          <Image
            src="/images/logo-gold.png"
            alt="The Curry Leaf — Indian Kitchen & Social House"
            width={792}
            height={426}
            priority
            className={`h-12 w-auto transition-opacity duration-500 sm:h-14 ${
              transparent ? "opacity-100" : "opacity-0"
            }`}
          />
          <Image
            src="/images/logo-green.png"
            alt=""
            aria-hidden
            width={792}
            height={426}
            priority
            className={`absolute inset-0 h-12 w-auto transition-opacity duration-500 sm:h-14 ${
              transparent ? "opacity-0" : "opacity-100"
            }`}
          />
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                pathname === l.href
                  ? transparent
                    ? "text-saffron-light"
                    : "text-saffron"
                  : transparent
                    ? "text-cream/90 hover:text-saffron-light"
                    : "text-cocoa/80 hover:text-leaf"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/reservations"
            className="whitespace-nowrap rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-cocoa transition-transform hover:scale-105 hover:bg-saffron-light"
          >
            Reserve a Table
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="hidden h-10 w-10 flex-col items-center justify-center gap-1.5 lg:flex xl:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded transition-all ${
              transparent ? "bg-cream" : "bg-cocoa"
            } ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 rounded transition-all ${
              transparent ? "bg-cream" : "bg-cocoa"
            } ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 rounded transition-all ${
              transparent ? "bg-cream" : "bg-cocoa"
            } ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden border-b border-white/50 bg-white/85 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-8 pt-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={l.href}
                    className={`block py-3 font-serif text-2xl ${
                      pathname === l.href ? "text-saffron" : "text-leaf-deep"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/reservations"
                className="mt-4 rounded-full bg-saffron px-6 py-3 text-center font-semibold text-cocoa"
              >
                Reserve a Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
