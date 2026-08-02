import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatUGX } from "@/data/menu";
import { updateOrderStatus } from "./actions";
import StatusSelect from "@/components/admin/StatusSelect";

export const dynamic = "force-dynamic";

const statusOptions = [
  { value: "RECEIVED", label: "Received" },
  { value: "PREPARING", label: "Preparing" },
  { value: "READY", label: "Ready" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const tabs = ["All", ...statusOptions.map((s) => s.value)];

interface OrderLine {
  name: string;
  qty: number;
  price: number;
  selections?: Record<string, string>;
}

export default async function BreakfastOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status && tabs.includes(status) ? status : "All";

  const orders = await prisma.breakfastOrder.findMany({
    where: filter === "All" ? {} : { status: filter as never },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-leaf-deep">
        Breakfast Orders
      </h1>
      <p className="mt-1 text-sm text-cocoa/60">
        {orders.length} {filter === "All" ? "total" : filter.toLowerCase()}.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t}
            href={t === "All" ? "/admin/breakfast-orders" : `/admin/breakfast-orders?status=${t}`}
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

      <div className="mt-5 space-y-3">
        {orders.map((o) => {
          const items = (o.items as unknown as OrderLine[]) ?? [];
          return (
            <details
              key={o.id}
              className="group overflow-hidden rounded-2xl bg-cream shadow-sm shadow-sand/40"
            >
              <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="font-medium text-cocoa">
                    {o.name}{" "}
                    <span className="text-xs font-normal text-cocoa/50">
                      · {o.fulfilment === "PICKUP" ? "Pickup" : "Delivery"}
                    </span>
                  </p>
                  <p className="text-xs text-cocoa/50">
                    {o.date} · {o.time} · {items.length} item
                    {items.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-lg text-saffron">
                    {o.hasVariable ? "~" : ""}
                    {formatUGX(o.total)}
                  </span>
                  <StatusSelect
                    value={o.status}
                    options={statusOptions}
                    onChange={updateOrderStatus.bind(null, o.id)}
                  />
                </div>
              </summary>

              <div className="border-t border-sand/50 px-5 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-cocoa/50">
                      Contact
                    </p>
                    <p className="mt-1 text-sm text-cocoa/80">
                      <a href={`tel:${o.phone}`} className="hover:text-leaf">
                        {o.phone}
                      </a>
                    </p>
                    {o.fulfilment === "DELIVERY" && (
                      <>
                        {o.address && (
                          <p className="mt-1 text-sm text-cocoa/70">
                            {o.address}
                          </p>
                        )}
                        {o.pinLat && o.pinLng && (
                          <a
                            href={`https://maps.google.com/?q=${o.pinLat},${o.pinLng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-xs font-semibold text-saffron underline"
                          >
                            View dropped pin (±{o.pinAccuracy}m)
                          </a>
                        )}
                      </>
                    )}
                    {o.notes && (
                      <p className="mt-2 text-sm text-cocoa/60">
                        Notes: {o.notes}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-cocoa/50">
                      Order
                    </p>
                    <ul className="mt-1 space-y-1 text-sm text-cocoa/80">
                      {items.map((line, i) => (
                        <li key={i}>
                          {line.qty} × {line.name}
                          {line.selections &&
                          Object.keys(line.selections).length > 0
                            ? ` (${Object.entries(line.selections)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(", ")})`
                            : ""}{" "}
                          — {formatUGX(line.price * line.qty)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </details>
          );
        })}
        {orders.length === 0 && (
          <p className="rounded-2xl bg-cream px-5 py-8 text-center text-sm text-cocoa/50 shadow-sm shadow-sand/40">
            No breakfast orders here yet.
          </p>
        )}
      </div>
    </div>
  );
}
