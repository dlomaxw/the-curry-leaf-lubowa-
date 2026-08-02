"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(id: string, status: string) {
  await prisma.breakfastOrder.update({
    where: { id },
    data: { status: status as OrderStatus },
  });
  revalidatePath("/admin/breakfast-orders");
  revalidatePath("/admin");
}
