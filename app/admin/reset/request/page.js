
"use client";
import { useState } from "react";

export default function RequestReset() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateToken() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reset/request");
      const data = await res.json();
      if (data.ok) setToken(data.token);
      else setError(data.error || "Failed");
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-20 card">
      <h1 className="font-bold text-xl mb-4">Generate Admin Reset Token</h1>
      <button className="btn btn-primary" onClick={generateToken} disabled={loading}>
        {loading ? "Generating..." : "Generate Token"}
      </button>
      {token && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="font-mono break-all">{token}</p>
          <p className="text-xs text-gray-600 mt-2">Valid for 10 minutes</p>
        </div>
      )}
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
