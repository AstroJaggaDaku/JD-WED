
import { connectDB } from "@/lib/db";
import OtpToken from "@/models/OtpToken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    if (!email) return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
    const token = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const expiresAt = new Date(Date.now() + 10*60*1000);
    await OtpToken.create({ email, token, expiresAt });
    // optional SMTP send (if configured), otherwise client will read token from response (for dev)
    if (process.env.OTP_SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.OTP_SMTP_HOST,
        port: parseInt(process.env.OTP_SMTP_PORT || "587"),
        secure: false,
        auth: {
          user: process.env.OTP_SMTP_USER || "",
          pass: process.env.OTP_SMTP_PASS || ""
        }
      });
      await transporter.sendMail({
        from: process.env.OTP_EMAIL_FROM || "no-reply@example.com",
        to: email,
        subject: "Your OTP for JD Matrimony",
        text: `Your verification code is: ${token}`
      });
    }
    return new Response(JSON.stringify({ ok: true, token }), { status: 200 }); // token included for no-SMTP flow
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
