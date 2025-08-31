"use client";
import ConnectionHeader from "./ConnectionHeader";

export default function ConnectionReport() {
  const connections = [
    { name: "192.168.0.39", icon: "🖥️" },
    { name: "192.168.0.40", icon: "🖥️" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ConnectionHeader />

      <div className="space-y-2">
        {connections.map((conn, i) => (
          <div
            key={i}
            className="flex items-center space-x-2 bg-white p-3 rounded-md border hover:shadow-md cursor-pointer"
          >
            <span>{conn.icon}</span>
            <span>{conn.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
