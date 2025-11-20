
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: String,
  role: { type: String, enum: ['user','admin'], default: 'user' },
  canViewProfiles: { type: Boolean, default: false },
  premium: { type: Boolean, default: false },
  premiumExpires: { type: Date, default: null },
  resetToken: String,
  resetTokenExpire: Date
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
