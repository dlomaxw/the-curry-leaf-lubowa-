"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Only administrators can manage staff accounts.");
  }
  return session;
}

export interface AddStaffState {
  error?: string;
  success?: string;
}

export async function addStaff(
  _prevState: AddStaffState,
  formData: FormData,
): Promise<AddStaffState> {
  try {
    await requireAdmin();
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Not authorized." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "STAFF");

  if (!name || !email) return { error: "Name and email are required." };
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (!["ADMIN", "MANAGER", "STAFF"].includes(role)) {
    return { error: "Invalid role." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "An account with that email already exists." };

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role: role as "ADMIN" | "MANAGER" | "STAFF",
    },
  });

  revalidatePath("/admin/staff");
  return { success: `${name}'s account was created.` };
}

export async function removeStaff(userId: string) {
  const session = await requireAdmin();
  if (session.user.id === userId) {
    throw new Error("You can't remove your own account.");
  }
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/staff");
}
