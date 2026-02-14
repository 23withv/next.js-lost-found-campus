import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function PelaporLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted/20 py-12">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4 bg-background shadow-sm",
        })}
      >
        <ArrowLeft className="size-4 mr-1" />
        Back
      </Link>

      <div className="flex w-full max-w-2xl flex-col gap-6 px-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 self-center font-black text-2xl tracking-tighter text-red-600"
        >
          CAMPUS L&F
        </Link>
        
        {children}
      </div>
    </div>
  );
}