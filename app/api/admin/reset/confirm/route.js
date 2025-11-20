
import { connectDB } from "@/lib/db";
import AdminResetToken from "@/models/AdminResetToken";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) return new Response(JSON.stringify({ error: "Missing" }), { status: 400 });
    const rec = await AdminResetToken.findOne({ token });
    if (!rec) return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 400 });
    // find admin user
    const admin = await User.findOne({ role: "admin" });
    if (!admin) return new Response(JSON.stringify({ error: "Admin not found" }), { status: 404 });
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    await AdminResetToken.deleteOne({ token });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
