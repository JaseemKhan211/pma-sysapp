"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket; // single persistent connection

export default function Home() {
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("Disconnected");

  useEffect(() => {
    // Connect once
    socket = io("http://localhost:5000", { transports: ["websocket"] });

    socket.on("connect", () => setStatus("Connected"));
    socket.on("disconnect", () => setStatus("Disconnected"));

    // Listen for system response
    socket.on("systemResponse", (data) => setResult(data));

    // Cleanup connection on unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const handleAccess = (ip) => {
    if (socket && status === "Connected") {
      socket.emit("connectToSystem", { targetIP: ip });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5">
      <p className="text-sm text-gray-500">Status: {status}</p>

      <button
        disabled={status !== "Connected"}
        onClick={() => handleAccess("192.168.1.101")}
        className="text-white px-10 py-2 rounded bg-blue-900 dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        Access System A
      </button>

      <button
        disabled={status !== "Connected"}
        onClick={() => handleAccess("192.168.1.102")}
        className="text-white px-10 py-2 rounded bg-blue-900 dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        Access System B
      </button>

      {result && (
        <pre className="mt-5 bg-gray-100 p-3 rounded text-sm w-full max-w-md overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
