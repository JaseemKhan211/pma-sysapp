"use client";
import { Menu } from "lucide-react";

export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6 border-b">
      <div className="flex items-center gap-4">
        {/* Toggle Sidebar Button */}
        <button onClick={onToggleSidebar} className="p-2 hover:bg-gray-200 rounded">
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-200 rounded-full">🔔</button>
        <button className="p-2 hover:bg-gray-200 rounded-full">⚙️</button>
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>
    </header>
  );
}
