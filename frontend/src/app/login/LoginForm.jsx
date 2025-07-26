"use client";
import { useState } from "react";
import { handleLogin } from "@/handlers/authHandlers";
import Image from "next/image";

export default function LoginForm() {
  const [usrid, setUsrid] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-blue-900 min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="w-4/5 text-white flex flex-col justify-center p-8">
        {/* <Image
          src="/pma_logo.png"
          alt="PMA Logo"
          width={100}
          height={100}
          className="mb-4"
        /> */}
        <h1 className="text-4xl font-bold mb-3">Privileged Access Management</h1>
        <p className="text-2xl text-white-700 mb-6">
          Cybersecurity solution that secures and manages privileged access with full control.
        </p>
      </div>

      {/* RIGHT PANEL (LOGIN) */}
      <div className="w-3/5 flex items-center justify-center bg-gray-100">
        <div className="p-6 max-w-sm w-full bg-white rounded-xl shadow-md">
          {/* <h2 className="text-xl font-bold mb-4">Login</h2> */}
          <form onSubmit={(e) => handleLogin(e, usrid, password)}>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded"
              value={usrid}
              onChange={(e) => setUsrid(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}