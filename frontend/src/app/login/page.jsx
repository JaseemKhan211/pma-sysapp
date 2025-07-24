"use client";
import { useState } from "react";
import { handleLogin } from "@/handlers/authHandlers";

export default function LoginPage() {
  const [usrid, setUsrid] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4"> Login </h2>
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
