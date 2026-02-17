import { Header } from "@/components/layout/header";
import { auth } from "@/auth";
import { ReactNode } from "react";

export default async function PelaporLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="pelapor"
        user={session?.user}       
      />
      <main className="container mx-auto py-6 px-4 md:px-8">{children}</main>
    </div>
  );
}