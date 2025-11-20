
import { connectDB } from "@/lib/db";
import OtpToken from "@/models/OtpToken";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, token, name, password } = await req.json();
    if (!email || !token) return new Response(JSON.stringify({ error: "Missing" }), { status: 400 });
    const rec = await OtpToken.findOne({ email, token, used: false, expiresAt: { $gt: new Date() } });
    if (!rec) return new Response(JSON.stringify({ error: "Invalid or expired" }), { status: 400 });
    rec.used = true;
    await rec.save();
    // if user exists, return ok; else create
    let user = await User.findOne({ email });
    if (!user) {
      const hashed = await bcrypt.hash(password || Math.random().toString(36).slice(2,10), 10);
      user = await User.create({ name: name || "User", email, password: hashed });
      const Profile = (await import('@/models/Profile')).default;
      await Profile.create({ userId: user._id, name: user.name, city: "", age: null });
    }
    return new Response(JSON.stringify({ ok: true, userId: user._id }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
