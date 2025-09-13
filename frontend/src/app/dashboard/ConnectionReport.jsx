"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConnectionHeader from "./ConnectionHeader";
import {
  useGetAllSystemsHandler,
  useDeleteSystemHandler,
  useGetSystemHandler,
} from "@/handlers/systemHandler";
import { useConnectSystemHandler } from "@/handlers/guacHandler";

import { Pencil, Trash2 } from "lucide-react";

export default function ConnectionReport() {
  const { handleGetAllSystems } = useGetAllSystemsHandler();
  const { handleDeleteSystem } = useDeleteSystemHandler();
  const { handleGetSystem } = useGetSystemHandler();
  const { handleConnectSystem } = useConnectSystemHandler();

  const [connections, setConnections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSystems = async () => {
      const result = await handleGetAllSystems();

      const systems = (result?.data?.systems || []).map((item) => ({
        systemid: item[7], 
        protocol: item[9],
      }));

      setConnections(systems);
    };
    fetchSystems();
  }, []);

  const handleEdit = async (systemid) => {
    await handleGetSystem(systemid);
    router.push(`/dashboard/connection/form?systemid=${systemid}`); 
  };

  const handleDelete = async (systemid) => {
    await handleDeleteSystem(systemid);
    setConnections((prev) => prev.filter((c) => c.systemid !== systemid));
  };

  const handleConnect = async (systemid) => {
    const result = await handleConnectSystem(systemid);
    if (result?.status === "success" && result.guacUrl) {
      window.open(result.guacUrl, "_blank"); 
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ConnectionHeader />

      <div className="space-y-2">
        {connections.map((conn, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white p-3 rounded-md border hover:shadow-md"
          >
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <span>🖥️</span>
              <span className="font-medium">{conn.systemid}</span>
              <span className="text-gray-500">{conn.protocol}</span>
            </div>

            {/* Right side actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(conn.systemid)}
                className="p-2 rounded-full hover:bg-blue-100 text-blue-600"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(conn.systemid)}
                className="p-2 rounded-full hover:bg-red-100 text-red-600"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={() => handleConnect(conn.systemid)} 
                className="p-2 rounded-full hover:bg-green-100 text-green-600"
              >
                🔗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}