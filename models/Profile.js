
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  age: Number,
  gender: String,
  height: String,
  religion: String,
  caste: String,
  education: String,
  occupation: String,
  salary: String,
  city: String,
  address: String,
  phone: String,
  about: String,
  image: String,
  verified: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  preferences: {
    preferredGenders: [String],
    minAge: Number,
    maxAge: Number,
    religion: String,
    caste: String,
    city: String
  },
  visitsCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
