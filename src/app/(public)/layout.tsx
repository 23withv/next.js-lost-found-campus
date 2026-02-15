import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 pt-6">
        <div className="relative flex items-center justify-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "absolute left-0 bg-background shadow-sm"
            )}
          >
            <ArrowLeft className="size-4 mr-2" />
            Home
          </Link>

          <Link 
            href="/" 
            className="font-black text-2xl tracking-tighter text-red-600 hover:opacity-90 transition-opacity"
          >
            CAMPUS L&F
          </Link>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}