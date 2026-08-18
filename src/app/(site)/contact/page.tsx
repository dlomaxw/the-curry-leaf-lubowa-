import type { Metadata } from "next";
import { site, whatsappLink } from "@/data/site";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";

export const metadata: Metadata = {
  title: "Contact & Location — The Curry Leaf, Lubowa",
  description:
    "Find The Curry Leaf in Lubowa, off Entebbe Road, Kampala. Call or WhatsApp +256 765 176232 for reservations, breakfast orders and event enquiries.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto grid max-w-content gap-12 px-5 py-12 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-saffron">
            Contact &amp; Location
          </p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-leaf-deep">
            Find Us in Lubowa
          </h1>
          <p className="mt-5 leading-relaxed text-cocoa/70">
            {site.location}. Look for the stone gate with the golden Curry Leaf
            sign — Bombay Adda and The Pizza Place share our home.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-cocoa/50">
                Call or WhatsApp
              </dt>
              <dd className="mt-1 font-serif text-3xl text-cocoa">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="transition-colors hover:text-saffron"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-cocoa/50">
                Hours
              </dt>
              <dd className="mt-1 leading-relaxed text-cocoa/80">
                Breakfast: {site.hours.breakfast}
                <br />
                Lunch: {site.hours.lunch}
                <br />
                {site.hours.buffet}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-cocoa/50">
                Email
              </dt>
              <dd className="mt-1 text-cocoa/80">
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-saffron"
                >
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <TrackedWhatsAppLink
              href={whatsappLink(
                "Hello The Curry Leaf! I have a question.",
              )}
              source="contact"
              message="Hello The Curry Leaf! I have a question."
              className="rounded-full bg-leaf px-8 py-3.5 font-semibold text-cream transition-transform hover:scale-105"
            >
              Message Us on WhatsApp
            </TrackedWhatsAppLink>
            <a
              href={`tel:${site.phoneHref}`}
              className="rounded-full border border-leaf px-8 py-3.5 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-cream"
            >
              Call {site.phone}
            </a>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-1.5 shadow-lg shadow-cocoa/5 backdrop-blur-md">
            <iframe
              src={site.map.embed}
              title="Map showing The Curry Leaf in Lubowa, Kampala"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[26rem] w-full rounded-2xl border-0 lg:h-[32rem]"
            />
          </div>
          <a
            href={site.map.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full border border-leaf px-7 py-3 text-sm font-semibold text-leaf transition-colors hover:bg-leaf hover:text-cream"
          >
            Open in Google Maps — get directions
          </a>
        </div>
      </div>
    </div>
  );
}
