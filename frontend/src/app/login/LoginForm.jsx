"use client";
import { useState, useEffect } from "react";
import { Fingerprint, Copy, RefreshCcw } from "lucide-react";
import { useLoginHandler } from '@/handlers/authHandler';
import { generateCaptcha } from "@/utils/generateCaptcha";

export default function LoginForm() {
  const handleLogin = useLoginHandler();
  const [usrid, setUsrid] = useState('');
  console.log("User ID:", usrid);
  const [pw, setPw] = useState('');
  console.log("Password:", pw);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(captcha);
    alert("CAPTCHA copied!");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ usrid, pw });
    console.log("Login submitted with User ID:", usrid, "and Password:", pw);
  };

  return (
    <div className="bg-blue-900 dark:bg-gray-900 min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="w-4/5 text-white flex flex-col justify-center p-8">
        <h1 className="text-4xl font-bold mb-3">
          Privileged Access Management
        </h1>
        <p className="text-2xl text-white-700 mb-6">
          Cybersecurity solution that secures and manages privileged access with
          full control.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-3/5 flex items-center justify-center bg-gray-100">
        <div className="p-6 max-w-sm w-full bg-white rounded-xl shadow-md">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded bg-white text-black"
              value={usrid}
              onChange={(e) => setUsrid(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded bg-white text-black"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />

            {/* CAPTCHA */}
            {/*<div className="mb-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono tracking-widest bg-gray-200 px-12 py-1 rounded">
                  {captcha}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRefreshCaptcha}
                    title="Refresh CAPTCHA"
                    className="text-blue-800 hover:text-blue-500"
                  >
                    <RefreshCcw className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    title="Copy CAPTCHA"
                    className="text-blue-800 hover:text-blue-500"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <input
                type="text"
                placeholder="Enter Captcha"
                className="w-full mt-2 p-2 border rounded bg-white text-black"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
              />
            </div>*/}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="text-white px-10 py-2 rounded bg-blue-900 dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-gray-700"
              >
                Login
              </button>
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
