"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// These run for anonymous site visitors, so every field is trimmed and
// length-capped defensively — never trust client input, even our own forms.

export async function submitReservation(data: {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  occasion: string;
  notes?: string;
}) {
  try {
    const name = data.name.trim().slice(0, 200);
    const phone = data.phone.trim().slice(0, 40);
    if (!name || !phone) return;

    await prisma.reservation.create({
      data: {
        name,
        phone,
        guests: Math.max(1, Math.min(500, Math.round(data.guests) || 1)),
        date: data.date.trim().slice(0, 20),
        time: data.time.trim().slice(0, 20),
        occasion: data.occasion.trim().slice(0, 100),
        notes: data.notes?.trim().slice(0, 1000) || null,
      },
    });
  } catch (err) {
    console.error("submitReservation failed", err);
  }
}

export async function submitEnquiry(data: {
  kind: "FAMILY" | "CORPORATE" | "PRIVATE";
  name: string;
  phone: string;
  guests: number;
  date: string;
  extra?: string;
  requirements?: string;
}) {
  try {
    const name = data.name.trim().slice(0, 200);
    const phone = data.phone.trim().slice(0, 40);
    if (!name || !phone) return;

    await prisma.enquiry.create({
      data: {
        kind: data.kind,
        name,
        phone,
        guests: Math.max(1, Math.min(2000, Math.round(data.guests) || 1)),
        date: data.date.trim().slice(0, 20),
        extra: data.extra?.trim().slice(0, 200) || null,
        requirements: data.requirements?.trim().slice(0, 1000) || null,
      },
    });
  } catch (err) {
    console.error("submitEnquiry failed", err);
  }
}

interface OrderLine {
  name: string;
  qty: number;
  price: number;
  selections?: Record<string, string>;
}

export async function submitBreakfastOrder(data: {
  name: string;
  phone: string;
  fulfilment: "PICKUP" | "DELIVERY";
  date: string;
  time: string;
  address?: string;
  pin?: { lat: number; lng: number; accuracy: number };
  notes?: string;
  items: OrderLine[];
  total: number;
  hasVariable: boolean;
}) {
  try {
    const name = data.name.trim().slice(0, 200);
    const phone = data.phone.trim().slice(0, 40);
    if (!name || !phone || data.items.length === 0) return;

    await prisma.breakfastOrder.create({
      data: {
        name,
        phone,
        fulfilment: data.fulfilment,
        date: data.date.trim().slice(0, 20),
        time: data.time.trim().slice(0, 20),
        address: data.address?.trim().slice(0, 500) || null,
        pinLat: data.pin?.lat ?? null,
        pinLng: data.pin?.lng ?? null,
        pinAccuracy: data.pin?.accuracy ?? null,
        notes: data.notes?.trim().slice(0, 1000) || null,
        items: data.items as unknown as Prisma.InputJsonValue,
        total: Math.max(0, Math.round(data.total)),
        hasVariable: data.hasVariable,
      },
    });
  } catch (err) {
    console.error("submitBreakfastOrder failed", err);
  }
}
