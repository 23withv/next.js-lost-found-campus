import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "@/types/db";

const userSchema = new Schema<IUser>(
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

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;