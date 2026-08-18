"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/bar-menu", label: "Bar Menu" },
  { href: "/admin/breakfast-menu", label: "Breakfast Menu" },
  { href: "/admin/reservations", label: "Reservations" },
  { href: "/admin/breakfast-orders", label: "Breakfast Orders" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/interests", label: "WhatsApp Interest" },
  { href: "/admin/staff", label: "Staff Accounts", adminOnly: true },
  { href: "/admin/account", label: "My Account" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href);
}

export default function AdminSidebar({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {links
        .filter((l) => !l.adminOnly || role === "ADMIN")
        .map((l) => {
        const active = isActive(pathname, l.href, l.exact);
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-saffron/15 text-saffron"
                : "text-cream/70 hover:bg-cream/5 hover:text-cream"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-cream/10 bg-leaf-deep px-5 py-3 lg:hidden">
        <span className="font-serif text-lg text-cream">The Curry Leaf</span>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
        >
          <span className="h-0.5 w-5 bg-cream" />
          <span className="h-0.5 w-5 bg-cream" />
          <span className="h-0.5 w-5 bg-cream" />
        </button>
      </div>

      <aside
        className={`flex-col border-r border-cream/10 bg-leaf-deep lg:flex lg:w-64 lg:flex-none ${
          open ? "flex" : "hidden"
        }`}
      >
        <div className="hidden px-6 py-6 lg:block">
          <span className="font-serif text-xl text-cream">The Curry Leaf</span>
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-saffron-light">
            Staff Dashboard
          </p>
        </div>

        <div className="py-3">{nav}</div>

        <div className="mt-auto border-t border-cream/10 px-5 py-4">
          <p className="truncate text-sm font-medium text-cream">{name}</p>
          <p className="truncate text-xs text-cream/50">{email}</p>
          <p className="mt-1 inline-block rounded-full bg-cream/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-saffron-light">
            {role}
          </p>
          <form action={logout} className="mt-3 lg:hidden">
            <button
              type="submit"
              className="w-full rounded-full border border-cream/30 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
