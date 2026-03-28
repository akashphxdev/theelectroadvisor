"use client";

import { usePathname } from "next/navigation";
import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  // 🔥 Login page → no sidebar/header
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 🔥 बाकी admin pages
  return (
  <div className="flex h-screen overflow-hidden">
    {/* Sidebar — fixed rahega */}
    <AdminSidebar />

    {/* Right side */}
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header — fixed rahega */}
      <AdminHeader />

      {/* Sirf yeh content scroll hoga */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <div className="p-6">{children}</div>
      </div>
    </div>
  </div>
);
}