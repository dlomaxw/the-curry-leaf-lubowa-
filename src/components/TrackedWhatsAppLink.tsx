"use client";

import type { ReactNode } from "react";
import { logInterest } from "@/app/(site)/actions";

/** A WhatsApp link that also logs the click as a WebsiteInterest, so staff
    see it in the admin dashboard even though the conversation itself
    happens in WhatsApp, outside our database. */
export default function TrackedWhatsAppLink({
  href,
  source,
  message,
  className,
  children,
}: {
  href: string;
  source: string;
  message: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        logInterest(source, message);
      }}
    >
      {children}
    </a>
  );
}
