import Link from "next/link";
import Image from "next/image";
import { site, whatsappLink } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-leaf-deep text-cream">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <Image
            src="/images/logo-gold.png"
            alt="The Curry Leaf — Indian Kitchen & Social House"
            width={792}
            height={426}
            className="h-20 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            The Soul of India, Served in Kampala. Good food, great company,
            warm hospitality.
          </p>
        </div>
        <div>
          <p className="font-serif text-xl text-saffron-light">Visit Us</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>{site.location}</li>
            <li>Breakfast: {site.hours.breakfast}</li>
            <li>Lunch: {site.hours.lunch}</li>
            <li>{site.hours.buffet}</li>
            <li>
              <a href={`tel:${site.phoneHref}`} className="hover:text-saffron-light">
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink("Hello The Curry Leaf!")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-saffron-light"
              >
                WhatsApp us
              </a>
            </li>
            <li>
              <a
                href={site.map.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-saffron-light"
              >
                Find us on Google Maps
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-serif text-xl text-saffron-light">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-cream/80">
            <li><Link href="/menu" className="hover:text-saffron-light">Menu</Link></li>
            <li><Link href="/breakfast" className="hover:text-saffron-light">Breakfast</Link></li>
            <li><Link href="/reservations" className="hover:text-saffron-light">Reservations</Link></li>
            <li><Link href="/experiences" className="hover:text-saffron-light">Experiences</Link></li>
            <li><Link href="/about" className="hover:text-saffron-light">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-saffron-light">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} The Curry Leaf, Lubowa. All rights reserved.
      </div>
    </footer>
  );
}
