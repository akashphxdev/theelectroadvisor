"use client";

import { usePathname } from "next/navigation";
import AdminLayout from "./AdminLayout";
import WebsiteLayout from "./WebsiteLayout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith("/admin");

  // 🔥 Admin Layout
  if (isAdmin) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  // 🌐 Website Layout
  return <WebsiteLayout>{children}</WebsiteLayout>;
}