
import mongoose from "mongoose";

const AdminResetSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 600 } // auto delete after 10 minutes
});

export default mongoose.models.AdminResetToken || mongoose.model("AdminResetToken", AdminResetSchema);
