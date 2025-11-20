
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";

export async function GET() {
  try {
    await connectDB();
    const profiles = await Profile.find().sort({ createdAt: -1 }).lean();
    return new Response(JSON.stringify(profiles), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
