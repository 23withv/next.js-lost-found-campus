import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { UserRole } from "./types/next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers.filter((provider: any) => provider.id !== "credentials"),
    Credentials({
      async authorize(credentials) {
        await connectDB();
        
        const emailStr = credentials.email as string;
        const passwordStr = credentials.password as string;

        const user = await UserModel.findOne({ email: emailStr });
        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(passwordStr, user.password);

        if (passwordMatch) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role as UserRole,
            image: user.image,
          };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        if (user.id) token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        if (token.role) {
          session.user.role = token.role as UserRole;
        }
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        
        if (!user.email) return false; 
        
        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await UserModel.create({
            name: user.name || "Google User", 
            email: user.email,
            image: user.image || null,
            role: "PELAPOR",
          });
          user.role = newUser.role;
          user.id = newUser._id.toString();
        } else {
          user.role = existingUser.role;
          user.id = existingUser._id.toString();
        }
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
});