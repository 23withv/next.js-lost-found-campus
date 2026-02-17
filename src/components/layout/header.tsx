import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserNav } from "./user-nav"; 
import { auth } from "@/auth";

type HeaderVariant = "public" | "auth" | "pelapor" | "home";

interface HeaderProps {
  variant?: HeaderVariant;
  className?: string;
  showBackButton?: boolean;
  backHref?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "ADMIN" | "PELAPOR" | string;
  } | null;
}

export async function Header({
  variant = "public",
  className,
  showBackButton = true,
  backHref = "/",
  user: passedUser,
}: HeaderProps) {
  const session = passedUser ? null : await auth();
  const currentUser = passedUser || session?.user;

  const isHome = variant === "home";
  const isAuth = variant === "auth";
  const isPelapor = variant === "pelapor";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md",
        "bg-background/70 backdrop-blur-sm border-border/40",
        "supports-backdrop-filter:bg-background/90 supports-backdrop-filter:backdrop-blur-md supports-backdrop-filter:border-border/60",
        isHome ? "bg-transparent border-transparent shadow-none" : "shadow-sm",
        className
      )}
    >
      <div className="relative flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
        <div className="flex items-center">
          {showBackButton && !isHome ? (
            <Link
              href={backHref}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-muted-foreground hover:text-red-600 transition-colors -ml-2"
              )}
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to Home
            </Link>
          ) : (
            <Link
              href="/"
              className="font-heading text-2xl font-black tracking-tighter text-red-600 dark:text-red-500"
            >
              CAMPUS L&F
            </Link>
          )}
        </div>

        {isHome && (
          <div className="flex flex-none items-center justify-center md:block">
            <Link
              href="/items"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-base font-medium text-foreground hover:text-red-600"
              )}
            >
              Browse Items
            </Link>
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          {isHome && !currentUser && (
            <>
              <Link
                href="/auth/signin"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className={buttonVariants({
                  size: "sm",
                  className: "bg-red-600 hover:bg-red-700 text-white",
                })}
              >
                Sign up
              </Link>
            </>
          )}

          {currentUser && <UserNav user={currentUser} />}
        </div>
      </div>
    </header>
  );
}