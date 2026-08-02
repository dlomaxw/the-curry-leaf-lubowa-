import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import AddStaffForm from "./AddStaffForm";
import RemoveStaffButton from "@/components/admin/RemoveStaffButton";

export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  const staff = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-leaf-deep">
        Staff Accounts
      </h1>
      <p className="mt-1 text-sm text-cocoa/60">
        {isAdmin
          ? "Create and manage individual logins for your team."
          : "Only administrators can add or remove staff accounts."}
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl bg-cream shadow-sm shadow-sand/40">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sand/60 text-xs uppercase tracking-wider text-cocoa/50">
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              {isAdmin && <th className="px-5 py-3 font-semibold" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/40">
            {staff.map((u) => (
              <tr key={u.id}>
                <td className="px-5 py-3 font-medium text-cocoa">{u.name}</td>
                <td className="px-5 py-3 text-cocoa/70">{u.email}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-saffron/15 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-saffron">
                    {u.role}
                  </span>
                </td>
                {isAdmin && (
                  <td className="px-5 py-3 text-right">
                    {u.id !== session?.user?.id && (
                      <RemoveStaffButton userId={u.id} name={u.name} />
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdmin && (
        <div className="mt-8 rounded-2xl bg-cream p-6 shadow-sm shadow-sand/40">
          <h2 className="font-serif text-xl font-semibold text-cocoa">
            Add Staff Account
          </h2>
          <p className="mt-1 text-sm text-cocoa/60">
            They should change this password from their own Account page
            after signing in.
          </p>
          <div className="mt-5">
            <AddStaffForm />
          </div>
        </div>
      )}
    </div>
  );
}
