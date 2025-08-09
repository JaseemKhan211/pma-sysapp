"use client";
import { useState } from "react";
import axios from 'axios';

export default function Home() {
  const [result, setResult] = useState(null);

  const handleAccess = async (ip) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/connect?targetIP=${ip}`);
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <div className="position flex content-center items-center justify-center">
      <button 
        onClick={() => handleAccess('192.168.1.101')}
        className="text-white px-10 py-2 rounded bg-blue-900 dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-gray-700"
      >
        Access System A
      </button>
      <button 
        onClick={() => handleAccess('192.168.1.102')}
        className="text-white px-10 py-2 rounded bg-blue-900 dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-gray-700"
      >
        Access System B
      </button>

      <pre>{result && JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
