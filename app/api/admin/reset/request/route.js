
import { connectDB } from "@/lib/db";
import AdminResetToken from "@/models/AdminResetToken";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    await connectDB();
    const token = uuidv4();
    await AdminResetToken.create({ token });
    // return token in response (no SMTP)
    return new Response(JSON.stringify({ ok: true, token }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
