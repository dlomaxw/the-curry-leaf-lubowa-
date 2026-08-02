import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateEnquiryStatus } from "./actions";
import StatusSelect from "@/components/admin/StatusSelect";

export const dynamic = "force-dynamic";

const statusOptions = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUOTED", label: "Quoted" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "CLOSED", label: "Closed" },
];

const kindLabels: Record<string, string> = {
  FAMILY: "Family",
  CORPORATE: "Corporate",
  PRIVATE: "Private",
};

const tabs = ["All", ...statusOptions.map((s) => s.value)];

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status && tabs.includes(status) ? status : "All";

  const enquiries = await prisma.enquiry.findMany({
    where: filter === "All" ? {} : { status: filter as never },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-leaf-deep">
        Enquiries
      </h1>
      <p className="mt-1 text-sm text-cocoa/60">
        {enquiries.length} {filter === "All" ? "total" : filter.toLowerCase()}.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t}
            href={t === "All" ? "/admin/enquiries" : `/admin/enquiries?status=${t}`}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === t
                ? "bg-leaf text-cream"
                : "bg-cream text-cocoa/70 hover:bg-sand/50"
            }`}
          >
            {t === "All" ? "All" : t.charAt(0) + t.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl bg-cream shadow-sm shadow-sand/40">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-sand/60 text-xs uppercase tracking-wider text-cocoa/50">
              <th className="px-5 py-3 font-semibold">Contact</th>
              <th className="px-5 py-3 font-semibold">Kind</th>
              <th className="px-5 py-3 font-semibold">Guests</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Details</th>
              <th className="px-5 py-3 font-semibold">Requirements</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/40">
            {enquiries.map((e) => (
              <tr key={e.id}>
                <td className="px-5 py-3">
                  <p className="font-medium text-cocoa">{e.name}</p>
                  <a
                    href={`tel:${e.phone}`}
                    className="text-xs text-cocoa/60 hover:text-leaf"
                  >
                    {e.phone}
                  </a>
                </td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-chilli/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-chilli">
                    {kindLabels[e.kind] ?? e.kind}
                  </span>
                </td>
                <td className="px-5 py-3 text-cocoa/70">{e.guests}</td>
                <td className="px-5 py-3 text-cocoa/70">{e.date}</td>
                <td className="max-w-[12rem] px-5 py-3 text-cocoa/60">
                  {e.extra ?? "—"}
                </td>
                <td className="max-w-[16rem] px-5 py-3 text-cocoa/60">
                  {e.requirements ?? "—"}
                </td>
                <td className="px-5 py-3">
                  <StatusSelect
                    value={e.status}
                    options={statusOptions}
                    onChange={updateEnquiryStatus.bind(null, e.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {enquiries.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-cocoa/50">
            No enquiries here yet.
          </p>
        )}
      </div>
    </div>
  );
}
