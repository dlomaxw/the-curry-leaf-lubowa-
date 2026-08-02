import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateReservationStatus } from "./actions";
import StatusSelect from "@/components/admin/StatusSelect";

export const dynamic = "force-dynamic";

const statusOptions = [
  { value: "RECEIVED", label: "Received" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "NO_SHOW", label: "No-show" },
];

const tabs = ["All", ...statusOptions.map((s) => s.value)];

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status && tabs.includes(status) ? status : "All";

  const reservations = await prisma.reservation.findMany({
    where: filter === "All" ? {} : { status: filter as never },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-leaf-deep">
        Reservations
      </h1>
      <p className="mt-1 text-sm text-cocoa/60">
        {reservations.length} {filter === "All" ? "total" : filter.toLowerCase()}.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t}
            href={t === "All" ? "/admin/reservations" : `/admin/reservations?status=${t}`}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === t
                ? "bg-leaf text-cream"
                : "bg-cream text-cocoa/70 hover:bg-sand/50"
            }`}
          >
            {t === "All" ? "All" : t.replace("_", " ")}
          </Link>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl bg-cream shadow-sm shadow-sand/40">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-sand/60 text-xs uppercase tracking-wider text-cocoa/50">
              <th className="px-5 py-3 font-semibold">Guest</th>
              <th className="px-5 py-3 font-semibold">Contact</th>
              <th className="px-5 py-3 font-semibold">Guests</th>
              <th className="px-5 py-3 font-semibold">Date &amp; Time</th>
              <th className="px-5 py-3 font-semibold">Occasion</th>
              <th className="px-5 py-3 font-semibold">Notes</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/40">
            {reservations.map((r) => (
              <tr key={r.id}>
                <td className="px-5 py-3 font-medium text-cocoa">{r.name}</td>
                <td className="px-5 py-3 text-cocoa/70">
                  <a href={`tel:${r.phone}`} className="hover:text-leaf">
                    {r.phone}
                  </a>
                </td>
                <td className="px-5 py-3 text-cocoa/70">{r.guests}</td>
                <td className="px-5 py-3 text-cocoa/70">
                  {r.date} · {r.time}
                </td>
                <td className="px-5 py-3 text-cocoa/70">{r.occasion}</td>
                <td className="max-w-[16rem] px-5 py-3 text-cocoa/60">
                  {r.notes ?? "—"}
                </td>
                <td className="px-5 py-3">
                  <StatusSelect
                    value={r.status}
                    options={statusOptions}
                    onChange={updateReservationStatus.bind(null, r.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reservations.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-cocoa/50">
            No reservations here yet.
          </p>
        )}
      </div>
    </div>
  );
}
