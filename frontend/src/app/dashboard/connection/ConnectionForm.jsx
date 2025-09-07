"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useCreateSystemHandler,
  useUpdateSystemHandler,
  useGetSystemHandler,
} from "@/handlers/systemHandler";
import InputField from "@/components/InputField";

export default function ConnectionForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editSystemId = searchParams.get("systemid");

  const { handleCreateSystem } = useCreateSystemHandler();
  const { handleUpdateSystem } = useUpdateSystemHandler();
  const { handleGetSystem } = useGetSystemHandler();

  const [systemid, setSystemid] = useState("");
  const [hostname, setHostname] = useState("");
  const [ip_address, setIpAddress] = useState("");
  const [loc, setLoc] = useState("");
  const [protocol, setProtocol] = useState("RDP");
  const [port, setPort] = useState("3389");
  const [tmeout, setTmeout] = useState("30");
  const [username, setUsername] = useState("");
  const [pw, setPassword] = useState("");
  const [domainid, setDomain] = useState("");

  useEffect(() => {
    const fetchSystem = async () => {
      if (editSystemId) {
        const result = await handleGetSystem(editSystemId);

        if (result?.data?.system) {
          const sys = Array.isArray(result.data.system[0])
            ? result.data.system[0]
            : result.data.system;

          // Only set state if not already set (to avoid overwriting user input)
          setSystemid((prev) => prev || sys[7] || "");
          setHostname((prev) => prev || sys[1] || "");
          setIpAddress((prev) => prev || sys[2] || "");
          setLoc((prev) => prev || sys[8] || "");
          setProtocol((prev) => prev || sys[9] || "RDP");
          setPort((prev) => prev || sys[10] || "3389");
          setTmeout((prev) => prev || sys[11] || "30");
          setUsername((prev) => prev || sys[12] || "");
          setPassword((prev) => prev || sys[13] || "");
          setDomain((prev) => prev || sys[14] || "");
        }
      }
    };
    fetchSystem();
  }, [editSystemId]); // Only run when editSystemId changes

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      systemid,
      hostname,
      ip_address,
      loc,
      protocol,
      port,
      tmeout,
      username,
      pw,
      domainid,
    };

    if (editSystemId) {
      await handleUpdateSystem(payload);
    } else {
      await handleCreateSystem(payload);
    }

    router.push("/dashboard/connection");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-white p-6 rounded-md shadow-md"
    >
      <h2 className="text-xl font-semibold">
        {editSystemId ? "Edit Endpoint" : "Add Endpoint"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Name"
          name="systemid"
          placeholder="Endpoint Name"
          value={systemid}
          onChange={(e) => setSystemid(e.target.value)}
          required
          disabled={!!editSystemId} 
        />
        <InputField
          label="Location"
          name="loc"
          placeholder="Location"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
        />
        <div>
          <label className="text-sm font-medium">Protocol</label>
          <select
            name="protocol"
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
            className="w-full px-3 py-2 border rounded-md border-gray-300"
          >
            <option value="RDP">RDP</option>
            <option value="SSH">SSH</option>
            <option value="VNC">VNC</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Hostname"
          name="hostname"
          placeholder="Host Name"
          value={hostname}
          onChange={(e) => setHostname(e.target.value)}
        />
        <InputField
          label="IP Address"
          name="ip_address"
          placeholder="e.g. 192.168.1.10"
          value={ip_address}
          onChange={(e) => setIpAddress(e.target.value)}
          required
        />
        <InputField
          label="Port"
          name="port"
          placeholder="Port"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
        <InputField
          label="Connection Timeout"
          name="tmeout"
          placeholder="Seconds"
          value={tmeout}
          onChange={(e) => setTmeout(e.target.value)}
        />
        <InputField
          label="Username"
          name="username"
          placeholder="System User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          name="pw"
          placeholder="System Password"
          value={pw}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label="Domain"
          name="domainid"
          placeholder="System Domain"
          value={domainid}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="text-white px-4 py-2 rounded bg-blue-900 dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-gray-700"
      >
        {editSystemId ? "Update" : "Create"}
      </button>
    </form>
  );
}