import { auth } from "@/auth";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function AccountPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-leaf-deep">
        My Account
      </h1>
      <p className="mt-1 text-sm text-cocoa/60">
        Signed in as {session?.user?.name} ({session?.user?.email})
      </p>

      <div className="mt-8 rounded-2xl bg-cream p-6 shadow-sm shadow-sand/40">
        <h2 className="font-serif text-xl font-semibold text-cocoa">
          Change Password
        </h2>
        <div className="mt-5">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
