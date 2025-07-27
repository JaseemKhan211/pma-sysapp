"use client";
import { useState } from "react";
import { Fingerprint } from "lucide-react";
import { handleLogin } from "@/handlers/authHandlers";

export default function LoginForm() {
  const [usrid, setUsrid] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-blue-900 dark:bg-gray-900 min-h-screen flex">
      {/* LEFT PANEL LOGIN */}
      <div className="w-4/5 text-white flex flex-col justify-center p-8">
        <h1 className="text-4xl font-bold mb-3">
          Privileged Access Management
        </h1>
        <p className="text-2xl text-white-700 mb-6">
          Cybersecurity solution that secures and manages privileged access with
          full control.
        </p>
      </div>

      {/* RIGHT PANEL (LOGIN) */}
      <div className="w-3/5 flex items-center justify-center bg-gray-100">
        <div className="p-6 max-w-sm w-full bg-white rounded-xl shadow-md">
          <form onSubmit={(e) => handleLogin(e, usrid, password)}>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded bg-white text-black dark:bg-white dark:text-black"
              value={usrid}
              onChange={(e) => setUsrid(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded bg-white text-black dark:bg-white dark:text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="text-white px-10 py-2 rounded bg-blue-900 dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-gray-700"
              >
                Login
              </button>

              {/* Fingerprint icon button */}
              <button
                type="button"
                onClick={() => alert("Fingerprint scan popup here")}
                className="p-2 rounded-full dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-gray-700"
                title="Login with Fingerprint"
              >
                <Fingerprint className="w-6 h-6 text-blue-900 dark:text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
