"use client";
import { useState } from "react";
import { Menu, Calendar, FileText, LayoutDashboard, File } from "lucide-react"; 

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
    { name: "Calendar", icon: <Calendar size={20} />, href: "/calendar" },
    { name: "Invoice", icon: <FileText size={20} />, href: "/invoice" },
    { name: "Pages", icon: <File size={20} />, href: "/pages" },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-[#111827] text-white h-screen flex flex-col transition-all duration-300`}
    >
      {/* Header with collapse button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <span className="text-xl font-bold">Secure Vault</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menus.map((menu, idx) => (
            <li key={idx}>
              <a
                href={menu.href}
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700"
              >
                {menu.icon}
                {!collapsed && <span>{menu.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}