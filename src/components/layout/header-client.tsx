"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserNav } from "./user-nav";
import { LogoutButton } from "@/components/auth/logout-button";

type HeaderVariant = "public" | "auth" | "pelapor" | "home";

interface HeaderClientProps {
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

export function HeaderClient({
  variant = "public",
  className,
  showBackButton = true,
  backHref = "/",
  user,
}: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = variant === "home";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
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
            <div className="hidden md:flex flex-none items-center justify-center">
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
            <div className="hidden md:flex items-center gap-2 md:gap-4">
              {isHome && !user && (
                <>
                  <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className={buttonVariants({
                      size: "sm",
                      className: "bg-red-600 hover:bg-red-700 text-white",
                    })}
                  >
                    Sign up
                  </Link>
                </>
              )}
              {user && <UserNav user={user} />}
            </div>

            <button
              className="md:hidden p-2 text-foreground transition-transform active:scale-90 cursor-pointer rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-x-4 top-20 z-40 flex flex-col overflow-hidden transition-all duration-300 md:hidden",
          "rounded-2xl border border-border/40 bg-background/95 backdrop-blur-2xl shadow-lg",
          isMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto max-h-100 p-6"
            : "-translate-y-4 opacity-0 pointer-events-none max-h-0 p-0"
        )}
      >
        <nav className="flex flex-col gap-4">
          {isHome && (
            <Link
              href="/items"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-bold text-foreground hover:text-red-600 transition-colors"
            >
              Browse Items
            </Link>
          )}

          {isHome && !user && (
            <div className="flex flex-col gap-3 mt-2">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className={buttonVariants({ variant: "outline", className: "w-full justify-center" })}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className={buttonVariants({
                  className: "w-full justify-center bg-red-600 hover:bg-red-700 text-white",
                })}
              >
                Sign up
              </Link>
            </div>
          )}

          {user && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1 border-b border-border/40 pb-4">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
              {user.role === "ADMIN" ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-red-600 transition-colors"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  href="/my-reports"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-red-600 transition-colors"
                >
                  My Reports
                </Link>
              )}
              <LogoutButton>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-red-600 w-full text-left transition-colors hover:text-red-700 cursor-pointer"
                >
                  Sign Out
                </button>
              </LogoutButton>
            </div>
          )}
        </nav>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}