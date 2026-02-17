import { Header } from "@/components/layout/header";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Header variant="auth" showBackButton={true} backHref="/" />
      <main className="flex-1 flex items-center justify-center p-4">{children}</main>
    </div>
  );
}