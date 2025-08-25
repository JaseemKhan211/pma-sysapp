export default function Topbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6 border-b">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-200 rounded-full">🔔</button>
        <button className="p-2 hover:bg-gray-200 rounded-full">⚙️</button>
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>
    </header>
  );
}