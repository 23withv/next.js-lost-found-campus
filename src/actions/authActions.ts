"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function googleLoginAction() {
    await signIn("google", { redirectTo: "/" });
}