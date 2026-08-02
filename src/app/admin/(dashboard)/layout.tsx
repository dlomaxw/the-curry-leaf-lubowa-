import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { logout } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Dashboard — The Curry Leaf",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  // Belt-and-braces: middleware already redirects, but a direct render
  // (e.g. during a stale build) should never leak the dashboard.
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col bg-ivory lg:flex-row">
      <AdminSidebar
        name={session.user.name ?? "Staff"}
        email={session.user.email ?? ""}
        role={session.user.role}
      />
      <div className="flex-1">
        <header className="hidden items-center justify-end border-b border-sand/60 bg-cream px-6 py-3 lg:flex">
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-leaf px-5 py-2 text-sm font-semibold text-leaf transition-colors hover:bg-leaf hover:text-cream"
            >
              Sign Out
            </button>
          </form>
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
