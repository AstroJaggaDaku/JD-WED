
"use client";
import { useState } from "react";

export default function ResetAdminPassword() {
  const [token, setToken] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  async function handleReset() {
    setMsg("");
    if (!token || !pass) { setMsg("Token and new password required"); return; }
    try {
      const res = await fetch("/api/admin/reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: pass })
      });
      const data = await res.json();
      setMsg(data.ok ? "Password Reset Successful!" : (data.error || "Failed"));
    } catch (err) {
      setMsg("Network error");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 card">
      <h1 className="text-xl font-bold mb-4">Admin Password Reset</h1>
      <input className="input mb-2" placeholder="Reset Token" value={token} onChange={(e)=>setToken(e.target.value)} />
      <input className="input mb-2" placeholder="New password" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} />
      <button className="btn btn-primary w-full" onClick={handleReset}>Reset Password</button>
      {msg && <p className="mt-3 text-center text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
