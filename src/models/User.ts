import mongoose, { Schema, Model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    image: { type: String, default: null },
    role: { type: String, enum: ["ADMIN", "PELAPOR"], default: "PELAPOR" },
    phone: { type: String, default: null },
  },
  { timestamps: true }
);

const UserModel: Model<any> = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;