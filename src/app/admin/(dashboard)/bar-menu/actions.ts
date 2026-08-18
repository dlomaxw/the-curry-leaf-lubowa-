"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { supabaseAdmin, BAR_IMAGES_BUCKET } from "@/lib/supabase-admin";

export interface BarFormState {
  error?: string;
}

export interface UploadImageState {
  error?: string;
  url?: string;
}

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/** Uploads a bar item photo to Supabase Storage and returns its public URL. */
export async function uploadBarImage(
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
  const path = `bar/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(BAR_IMAGES_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}` };
  }

  const { data } = supabaseAdmin.storage
    .from(BAR_IMAGES_BUCKET)
    .getPublicUrl(path);

  return { url: data.publicUrl };
}

function parseBarItem(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const subcategory = String(formData.get("subcategory") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const priceLabel = String(formData.get("priceLabel") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !category) {
    throw new Error("Name and category are required.");
  }
  if (!priceRaw && !priceLabel) {
    throw new Error("Set either a price or a price label (e.g. Glass/Bottle).");
  }
  if (priceRaw && (!Number.isFinite(Number(priceRaw)) || Number(priceRaw) < 0)) {
    throw new Error("Price must be a positive number.");
  }

  return {
    name,
    category,
    subcategory: subcategory || null,
    price: priceRaw ? Math.round(Number(priceRaw)) : null,
    priceLabel: priceLabel || null,
    description: description || null,
    image: String(formData.get("image") ?? "").trim() || null,
    available: formData.get("available") === "on",
  };
}

export async function createBarItem(
  _prevState: BarFormState,
  formData: FormData,
): Promise<BarFormState> {
  try {
    const data = parseBarItem(formData);
    const count = await prisma.barItem.count();
    await prisma.barItem.create({ data: { ...data, sortOrder: count } });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not save item." };
  }
  revalidatePath("/admin/bar-menu");
  revalidatePath("/bar");
  revalidatePath("/");
  redirect("/admin/bar-menu");
}

export async function updateBarItem(
  id: string,
  _prevState: BarFormState,
  formData: FormData,
): Promise<BarFormState> {
  try {
    const data = parseBarItem(formData);
    await prisma.barItem.update({ where: { id }, data });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not save item." };
  }
  revalidatePath("/admin/bar-menu");
  revalidatePath("/bar");
  revalidatePath("/");
  redirect("/admin/bar-menu");
}

export async function deleteBarItem(id: string) {
  await prisma.barItem.delete({ where: { id } });
  revalidatePath("/admin/bar-menu");
  revalidatePath("/bar");
  revalidatePath("/");
}

export async function toggleBarAvailability(id: string, available: boolean) {
  await prisma.barItem.update({ where: { id }, data: { available } });
  revalidatePath("/admin/bar-menu");
  revalidatePath("/bar");
  revalidatePath("/");
}
