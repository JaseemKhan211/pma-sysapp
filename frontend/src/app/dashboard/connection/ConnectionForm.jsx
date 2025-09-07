"use client";
import { useState } from "react";
import InputField from "@/components/InputField";

export default function ConnectionForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "ROOT",
    protocol: "RDP",
    hostname: "",
    port: "3389",
    timeout: "",
    username: "",
    password: "",
    domain: "",
    securityMode: "Any",
    ignoreCert: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold">Endpoint Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField label="Name" name="name" placeholder='Endpoint Name' value={formData.name} onChange={handleChange} />
        <InputField label="Location" name="location" placeholder='Location' value={formData.location} onChange={handleChange} />
        <div>
          <label className="text-sm font-medium">Protocol</label>
          <select
            name="protocol"
            value={formData.protocol}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md border-gray-300"
          >
            <option>RDP</option>
            <option>SSH</option>
            <option>VNC</option>
          </select>
        </div>
      </div>

      {/* <h2 className="text-xl font-semibold">Parameters</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField label="Hostname" name="hostname" placeholder='Host Name' value={formData.hostname} onChange={handleChange} />
        <InputField label="Port" name="port" placeholder='Port' value={formData.port} onChange={handleChange} />
        <InputField label="Connection Timeout" name="timeout" placeholder='Session Time Out' value={formData.timeout} onChange={handleChange} />
        <InputField label="Username" name="username" placeholder='System User Name' value={formData.username} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" placeholder='System Password' value={formData.password} onChange={handleChange} />
        <InputField label="Domain" name="domain" placeholder='System Domain' value={formData.domain} onChange={handleChange} />
        <div>
          <label className="text-sm font-medium">Security Mode</label>
          <select
            name="securityMode"
            value={formData.securityMode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md border-gray-300"
          >
            <option>Any</option>
            <option>NLA</option>
            <option>RDP</option>
            <option>TLS</option>
          </select>
        </div>
        {/* <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" name="disableAuth" checked={formData.disableAuth} onChange={handleChange} />
          <label>Disable authentication</label>
        </div> */}
        {/* <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" name="ignoreCert" checked={formData.ignoreCert} onChange={handleChange} />
          <label>Ignore server certificate</label>
        </div> */}
        {/* <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" name="trustCertOnFirstUse" checked={formData.trustCertOnFirstUse} onChange={handleChange} />
          <label>Trust cert on first use</label>
        </div> */}
        {/* <InputField label="Trusted Fingerprints" name="fingerprints" value={formData.fingerprints} onChange={handleChange} /> */}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}
