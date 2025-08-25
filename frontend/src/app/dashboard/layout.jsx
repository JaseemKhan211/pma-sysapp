"use client";
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ThemeToggle from '@/components/ThemeToggle';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      <ThemeToggle />
    </div>
  );
}
