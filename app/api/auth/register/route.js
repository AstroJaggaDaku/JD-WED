
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, password } = body || {};
    if (!name || !email || !password) return new Response(JSON.stringify({ error: "Missing" }), { status: 400 });
    const exists = await User.findOne({ email });
    if (exists) return new Response(JSON.stringify({ error: "User exists" }), { status: 400 });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    // create empty profile
    const Profile = (await import('@/models/Profile')).default;
    await Profile.create({ userId: user._id, name: name, city: "", age: null });
    return new Response(JSON.stringify({ ok: true, userId: user._id }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
