"use server"

import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import { registerSchema } from "@/types/authSchema";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const validate = registerSchema.safeParse(data);
  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  const { name, email, phone, password } = validate.data;

  await connectDB();

  const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    return { error: "Email or Phone Number is already registered" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: "PELAPOR"
  });

  return { success: true };
}