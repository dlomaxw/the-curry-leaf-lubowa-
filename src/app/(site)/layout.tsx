import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import MobileTabBar from "@/components/MobileTabBar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
