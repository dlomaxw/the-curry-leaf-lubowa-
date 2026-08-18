import type { Metadata, Viewport } from "next";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import "./globals.css";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://thecurryleaf.ug/#restaurant",
  name: site.name,
  description:
    "Experience authentic Indian flavours, premium hospitality and unforgettable dining at The Curry Leaf, Lubowa, Kampala.",
  url: "https://thecurryleaf.ug",
  telephone: site.phoneHref,
  image: "https://thecurryleaf.ug/images/logo-dark.webp",
  servesCuisine: ["Indian"],
  priceRange: "UGX 10,000–130,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Off Entebbe Road",
    addressLocality: "Lubowa, Kampala",
    addressCountry: "UG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.map.lat,
    longitude: site.map.lng,
  },
  hasMap: site.map.link,
  menu: "https://thecurryleaf.ug/menu",
  acceptsReservations: "True",
  openingHoursSpecification: [
    { opens: "07:00", closes: "11:00" },
    { opens: "12:00", closes: "15:00" },
    { opens: "18:00", closes: "22:30" },
  ].map((w) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: DAYS,
    opens: w.opens,
    closes: w.closes,
  })),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the bottom tab bar pad itself around the iPhone home-indicator area.
  viewportFit: "cover",
};

export const metadata: Metadata = {
  // Update to the live domain once the site is deployed.
  metadataBase: new URL("https://thecurryleaf.ug"),
  title: "The Curry Leaf — Indian Kitchen & Social House, Lubowa",
  description:
    "Experience authentic Indian flavours, premium hospitality and unforgettable dining at The Curry Leaf, Lubowa, Kampala. Thali lunches, tandoor specialities, biryani and the Sunday Grand Buffet.",
  keywords: [
    "indian food close to me",
    "indian meals",
    "south indian food",
    "indian kitchen",
    "indian food near me",
    "south indian meals",
  ],
  openGraph: {
    title: "The Curry Leaf — Indian Kitchen & Social House",
    description:
      "The Soul of India, Served in Kampala. Authentic Indian dining in Lubowa — off Entebbe Road.",
    images: ["/images/logo-dark.webp"],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={restaurantJsonLd} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PBF53B3S');`}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WH0HCWMY9K"
          strategy="afterInteractive"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WH0HCWMY9K');`}
        </Script>
      </head>
      <body className="font-sans text-cocoa antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PBF53B3S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
