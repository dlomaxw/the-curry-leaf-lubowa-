"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Dietary } from "@prisma/client";
import { auth } from "@/auth";
import { supabaseAdmin, DISH_IMAGES_BUCKET } from "@/lib/supabase-admin";

export interface MenuFormState {
  error?: string;
}

export interface UploadImageState {
  error?: string;
  url?: string;
}

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/** Uploads a dish photo to Supabase Storage and returns its public URL. */
export async function uploadDishImage(
  _prevState: UploadImageState,
  formData: FormData,
): Promise<UploadImageState> {
  const session = await auth();
  if (!session?.user) return { error: "You must be signed in." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image file first." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Please upload a JPEG, PNG, WEBP or AVIF image." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "Image is too large — please keep it under 5MB." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `dishes/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(DISH_IMAGES_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}` };
  }

  const { data } = supabaseAdmin.storage
    .from(DISH_IMAGES_BUCKET)
    .getPublicUrl(path);

  return { url: data.publicUrl };
}

function parseDish(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = Number(formData.get("price"));
  const priceMaxRaw = String(formData.get("priceMax") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const dietary = String(formData.get("dietary") ?? "VEG") as Dietary;
  const spice = Number(formData.get("spice") ?? 0);

  if (!name || !category || !description) {
    throw new Error("Name, category and description are required.");
  }
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Price must be a positive number.");
  }

  return {
    name,
    category,
    price: Math.round(price),
    priceMax: priceMaxRaw ? Math.round(Number(priceMaxRaw)) : null,
    description,
    dietary,
    spice: Math.min(3, Math.max(0, Math.round(spice))),
    featured: formData.get("featured") === "on",
    accent: String(formData.get("accent") ?? "").trim() || null,
    image: String(formData.get("image") ?? "").trim() || null,
    containsNuts: formData.get("containsNuts") === "on",
    glutenFree: formData.get("glutenFree") === "on",
    dairyFree: formData.get("dairyFree") === "on",
    available: formData.get("available") === "on",
  };
}

export async function createMenuItem(
  _prevState: MenuFormState,
  formData: FormData,
): Promise<MenuFormState> {
  try {
    const data = parseDish(formData);
    const count = await prisma.menuItem.count();
    await prisma.menuItem.create({ data: { ...data, sortOrder: count } });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not save dish." };
  }
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
  redirect("/admin/menu");
}

export async function updateMenuItem(
  id: string,
  _prevState: MenuFormState,
  formData: FormData,
): Promise<MenuFormState> {
  try {
    const data = parseDish(formData);
    await prisma.menuItem.update({ where: { id }, data });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not save dish." };
  }
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
  redirect("/admin/menu");
}

export async function deleteMenuItem(id: string) {
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
}

export async function toggleMenuAvailability(id: string, available: boolean) {
  await prisma.menuItem.update({ where: { id }, data: { available } });
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
}
