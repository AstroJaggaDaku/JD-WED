
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";
import Notification from "@/models/Notification";

export async function POST(req) {
  try {
    await connectDB();
    const { id, approve } = await req.json();
    await Profile.findByIdAndUpdate(id, { approved: approve });
    await Notification.create({ userId: id, type: approve ? 'profile_approved' : 'profile_rejected', title: approve ? 'Profile Approved' : 'Profile Rejected', message: approve ? 'Your profile has been approved' : 'Your profile has been rejected', meta: { profileId: id } });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
