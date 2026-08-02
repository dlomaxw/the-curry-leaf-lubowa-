"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ReservationStatus } from "@prisma/client";

export async function updateReservationStatus(id: string, status: string) {
  await prisma.reservation.update({
    where: { id },
    data: { status: status as ReservationStatus },
  });
  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
}
