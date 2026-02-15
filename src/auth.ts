import NextAuth, { User } from "next-auth";
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

        const user = await UserModel.findOne({ email: credentials.email });
        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password as string, 
          user.password
        );

        if (passwordMatch) {
          return {
             id: user._id.toString(),
             name: user.name,
             email: user.email,
             role: user.role as UserRole ,
             image: user.image
          };
        }
        return null;
      }
    })
  ],
callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role as UserRole; 
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await UserModel.findOne({ email: user.email });
        
        if (!existingUser) {
          const newUser = await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "PELAPOR",
          });
          user.role = newUser.role;
        } else {
          user.role = existingUser.role;
        }
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
});