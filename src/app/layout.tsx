import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  // Update to the live domain once the site is deployed.
  metadataBase: new URL("https://thecurryleaf.ug"),
  title: "The Curry Leaf — Indian Kitchen & Social House, Lubowa",
  description:
    "Experience authentic Indian flavours, premium hospitality and unforgettable dining at The Curry Leaf, Lubowa, Kampala. Thali lunches, tandoor specialities, biryani and the Sunday Grand Buffet.",
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
      </head>
      <body className="font-sans bg-ivory text-cocoa antialiased">
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
