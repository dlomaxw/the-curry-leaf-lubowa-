"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { EnquiryStatus } from "@prisma/client";

export async function updateEnquiryStatus(id: string, status: string) {
  await prisma.enquiry.update({
    where: { id },
    data: { status: status as EnquiryStatus },
  });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
