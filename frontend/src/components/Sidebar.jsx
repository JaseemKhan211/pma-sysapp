"use client";
import { FileText, LayoutDashboard, File, Plug } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar({ collapsed }) {
  const menus = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
    { name: "Endpoint", icon: <Plug size={20} />, href: "/dashboard/connection" },
    { name: "Invoice", icon: <FileText size={20} />, href: "/invoice" },
    { name: "Pages", icon: <File size={20} />, href: "/pages" },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-[#111827] text-white h-screen flex flex-col transition-all duration-300`}
    >
      {/* Logo and Name */}
      <div className="flex items-center justify-center h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={28} height={28} />
          {!collapsed && <span className="text-xl font-bold">Secure Vault</span>}
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menus.map((menu, idx) => (
            <li key={idx}>
              <Link
                href={menu.href}
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700"
              >
                {menu.icon}
                {!collapsed && <span>{menu.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}