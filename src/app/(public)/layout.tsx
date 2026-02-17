import { Header } from "@/components/layout/header";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <Header variant="public" />
      <main className="pt-4">{children}</main>
    </div>
  );
}