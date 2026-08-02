import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Staff Login — The Curry Leaf",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-leaf-deep px-5 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-cream p-8 shadow-2xl">
        <div className="flex justify-center">
          <Image
            src="/images/logo-green.png"
            alt="The Curry Leaf"
            width={792}
            height={426}
            className="h-16 w-auto"
          />
        </div>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-saffron">
          Staff Dashboard
        </p>
        <div className="mt-6">
          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
}
