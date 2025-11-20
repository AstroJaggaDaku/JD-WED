
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User";
import Profile from "./models/Profile";

(async function run() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("Please set MONGO_URI in environment");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
    const adminPw = await bcrypt.hash("Admin@1234", 10);
    const admin = await User.findOneAndUpdate({ email: "admin@jd.com" }, { name: "Admin", email: "admin@jd.com", password: adminPw, role: "admin", canViewProfiles: true }, { upsert: true, new: true });
    await Profile.findOneAndUpdate({ userId: admin._id }, { userId: admin._id, name: "Admin", city: "HQ", age: 30 }, { upsert: true });
    console.log("Admin seeded: admin@jd.com / Admin@1234");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
