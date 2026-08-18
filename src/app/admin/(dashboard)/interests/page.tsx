import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const sourceLabels: Record<string, string> = {
  bar: "Bombay Adda Bar",
  "book-clubs": "Book Clubs",
  "film-festival": "Film Festival",
  contact: "Contact Page",
};

const sourceColors: Record<string, string> = {
  bar: "bg-saffron/15 text-saffron",
  "book-clubs": "bg-leaf/15 text-leaf",
  "film-festival": "bg-chilli/15 text-chilli",
  contact: "bg-cocoa/10 text-cocoa/70",
};

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const mins = Math.floor(seconds / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "just now";
}

export default async function InterestsPage() {
  const interests = await prisma.websiteInterest.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-leaf-deep">
        WhatsApp Interest
      </h1>
      <p className="mt-1 text-sm text-cocoa/60">
        {interests.length} click{interests.length === 1 ? "" : "s"} on a
        &quot;Message us on WhatsApp&quot; link — Bar, Book Clubs, Film
        Festival and Contact. The actual conversation happens in WhatsApp;
        this just tells you someone reached out.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl bg-cream shadow-sm shadow-sand/40">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sand/60 text-xs uppercase tracking-wider text-cocoa/50">
              <th className="px-5 py-3 font-semibold">Source</th>
              <th className="px-5 py-3 font-semibold">Message</th>
              <th className="px-5 py-3 font-semibold">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/40">
            {interests.map((i) => (
              <tr key={i.id}>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${
                      sourceColors[i.source] ?? "bg-cocoa/10 text-cocoa/70"
                    }`}
                  >
                    {sourceLabels[i.source] ?? i.source}
                  </span>
                </td>
                <td className="max-w-md px-5 py-3 text-cocoa/70">{i.message}</td>
                <td className="whitespace-nowrap px-5 py-3 text-cocoa/50">
                  {timeAgo(i.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {interests.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-cocoa/50">
            No WhatsApp clicks logged yet.
          </p>
        )}
      </div>
    </div>
  );
}
