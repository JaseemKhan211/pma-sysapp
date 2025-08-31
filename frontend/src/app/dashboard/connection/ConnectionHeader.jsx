"use client";
import { useRouter } from "next/navigation";

export default function ConnectionHeader() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="space-x-2">
        <button
          className="bg-black text-white px-3 py-2 rounded-md text-sm"
          onClick={() => router.push("/dashboard/connection/form")}
        >
          🖥️➕ New Connection
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Filter"
        className="border px-3 py-2 rounded-md w-60"
      />
    </div>
  );
}
