"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // 🔥 localStorage clear
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    // 🔥 cookie delete
    document.cookie =
      "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // 🔥 redirect to login
    router.push("/admin/login"); // ya "/admin/login" agar waha hai
  };

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Articles", path: "/admin/articles" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Authors", path: "/admin/authors" },
    { name: "Admins", path: "/admin/admins" },
  ];

 // h-screen overflow-hidden add karo, aur menu ko scrollable banao
return (
  <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between overflow-hidden">
    <div className="flex-1 overflow-y-auto">
      <h1 className="text-xl font-bold p-5 border-b border-gray-700">
        Admin Panel
      </h1>

      <ul className="mt-4">
        {menu.map((item, i) => (
          <li key={i}>
            <Link
              href={item.path}
              className={`block px-5 py-3 hover:bg-gray-800 transition ${
                pathname === item.path ? "bg-gray-800" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* Bottom section - hamesha neeche rahega */}
    <div className="p-5 border-t border-gray-700 flex-shrink-0">
      <Link href="/" className="block mb-2 text-sm text-gray-400">
        ← Back to website
      </Link>
      <button
        onClick={handleLogout}
        className="text-red-500 text-sm hover:text-red-400"
      >
        Sign out
      </button>
    </div>
  </div>
);
}