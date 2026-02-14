import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

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
             role: user.role,
             image: user.image
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await UserModel.findOne({ email: user.email });
        
        if (!existingUser) {
          await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "PELAPOR",
          });
        }
        
        if (existingUser) {
          user.role = existingUser.role;
        } else {
          user.role = "PELAPOR";
        }
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
});