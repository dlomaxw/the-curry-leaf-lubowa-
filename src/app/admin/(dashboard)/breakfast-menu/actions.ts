"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { BreakfastChoice } from "@/data/breakfast";

export interface BreakfastFormState {
  error?: string;
}

function parseBreakfastItem(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = Number(formData.get("price"));
  const priceMaxRaw = String(formData.get("priceMax") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const includesRaw = String(formData.get("includes") ?? "");
  const choicesRaw = String(formData.get("choicesJson") ?? "[]");

  if (!name || !category) {
    throw new Error("Name and category are required.");
  }
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Price must be a positive number.");
  }

  let choices: BreakfastChoice[] = [];
  try {
    const parsed = JSON.parse(choicesRaw);
    if (Array.isArray(parsed)) {
      choices = parsed.filter(
        (c) => c && typeof c.label === "string" && Array.isArray(c.options) && c.options.length > 0,
      );
    }
  } catch {
    throw new Error("Choices data was malformed — please re-add them.");
  }

  return {
    name,
    category,
    price: Math.round(price),
    priceMax: priceMaxRaw ? Math.round(Number(priceMaxRaw)) : null,
    description: description || null,
    includes: includesRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    choices:
      choices.length > 0
        ? (choices as unknown as Prisma.InputJsonValue)
        : undefined,
    available: formData.get("available") === "on",
  };
}

export async function createBreakfastItem(
  _prevState: BreakfastFormState,
  formData: FormData,
): Promise<BreakfastFormState> {
  try {
    const data = parseBreakfastItem(formData);
    const count = await prisma.breakfastItem.count();
    await prisma.breakfastItem.create({ data: { ...data, sortOrder: count } });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not save item." };
  }
  revalidatePath("/admin/breakfast-menu");
  revalidatePath("/breakfast");
  revalidatePath("/");
  redirect("/admin/breakfast-menu");
}

export async function updateBreakfastItem(
  id: string,
  _prevState: BreakfastFormState,
  formData: FormData,
): Promise<BreakfastFormState> {
  try {
    const data = parseBreakfastItem(formData);
    await prisma.breakfastItem.update({ where: { id }, data });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not save item." };
  }
  revalidatePath("/admin/breakfast-menu");
  revalidatePath("/breakfast");
  revalidatePath("/");
  redirect("/admin/breakfast-menu");
}

export async function deleteBreakfastItem(id: string) {
  await prisma.breakfastItem.delete({ where: { id } });
  revalidatePath("/admin/breakfast-menu");
  revalidatePath("/breakfast");
}

export async function toggleBreakfastAvailability(id: string, available: boolean) {
  await prisma.breakfastItem.update({ where: { id }, data: { available } });
  revalidatePath("/admin/breakfast-menu");
  revalidatePath("/breakfast");
}
