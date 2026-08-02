import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getCounts() {
  const [
    newReservations,
    newOrders,
    newEnquiries,
    menuItems,
    unavailableMenuItems,
    breakfastItems,
  ] = await Promise.all([
    prisma.reservation.count({ where: { status: "RECEIVED" } }),
    prisma.breakfastOrder.count({ where: { status: "RECEIVED" } }),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.menuItem.count(),
    prisma.menuItem.count({ where: { available: false } }),
    prisma.breakfastItem.count(),
  ]);
  return {
    newReservations,
    newOrders,
    newEnquiries,
    menuItems,
    unavailableMenuItems,
    breakfastItems,
  };
}

async function getRecentActivity() {
  const [reservations, orders, enquiries] = await Promise.all([
    prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.breakfastOrder.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const items = [
    ...reservations.map((r) => ({
      id: `res-${r.id}`,
      kind: "Reservation" as const,
      title: `${r.name} · ${r.guests} guests`,
      subtitle: `${r.date} at ${r.time}`,
      href: "/admin/reservations",
      createdAt: r.createdAt,
    })),
    ...orders.map((o) => ({
      id: `ord-${o.id}`,
      kind: "Breakfast Order" as const,
      title: `${o.name} · ${o.fulfilment === "PICKUP" ? "Pickup" : "Delivery"}`,
      subtitle: `${o.date} at ${o.time}`,
      href: "/admin/breakfast-orders",
      createdAt: o.createdAt,
    })),
    ...enquiries.map((e) => ({
      id: `enq-${e.id}`,
      kind: "Enquiry" as const,
      title: `${e.name} · ${e.kind.charAt(0) + e.kind.slice(1).toLowerCase()}`,
      subtitle: `${e.guests} guests, ${e.date}`,
      href: "/admin/enquiries",
      createdAt: e.createdAt,
    })),
  ];

  return items
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8);
}

const kindStyle: Record<string, string> = {
  Reservation: "bg-leaf/10 text-leaf",
  "Breakfast Order": "bg-saffron/15 text-saffron",
  Enquiry: "bg-chilli/10 text-chilli",
};

export default async function AdminOverviewPage() {
  const counts = await getCounts();
  const activity = await getRecentActivity();

  const stats = [
    {
      label: "New Reservations",
      value: counts.newReservations,
      href: "/admin/reservations",
      accent: "border-leaf",
    },
    {
      label: "New Breakfast Orders",
      value: counts.newOrders,
      href: "/admin/breakfast-orders",
      accent: "border-saffron",
    },
    {
      label: "New Enquiries",
      value: counts.newEnquiries,
      href: "/admin/enquiries",
      accent: "border-chilli",
    },
    {
      label: "Menu Items",
      value: counts.menuItems,
      sub:
        counts.unavailableMenuItems > 0
          ? `${counts.unavailableMenuItems} unavailable`
          : "All available",
      href: "/admin/menu",
      accent: "border-sand",
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-leaf-deep">
        Overview
      </h1>
      <p className="mt-1 text-sm text-cocoa/60">
        What needs attention today.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`rounded-2xl border-t-4 bg-cream p-5 shadow-sm shadow-sand/40 transition-shadow hover:shadow-md ${s.accent}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-cocoa/50">
              {s.label}
            </p>
            <p className="mt-2 font-serif text-4xl text-cocoa">{s.value}</p>
            {s.sub && <p className="mt-1 text-xs text-cocoa/50">{s.sub}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-xl font-semibold text-cocoa">
          Recent Activity
        </h2>
        {activity.length === 0 ? (
          <p className="mt-3 text-sm text-cocoa/50">
            Nothing has come in yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-sand/60 rounded-2xl bg-cream shadow-sm shadow-sand/40">
            {activity.map((a) => (
              <li key={a.id}>
                <Link
                  href={a.href}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-ivory"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-cocoa">
                      {a.title}
                    </p>
                    <p className="text-xs text-cocoa/50">{a.subtitle}</p>
                  </div>
                  <span
                    className={`flex-none rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider ${kindStyle[a.kind]}`}
                  >
                    {a.kind}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
