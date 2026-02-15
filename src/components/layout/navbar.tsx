import Link from "next/link";
import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";

export const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
       
        <div className="flex shrink-0 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-black tracking-tighter text-red-600 dark:text-red-500">
              CAMPUS L&F
            </span>
          </Link>
        </div>

        <div className="flex flex-none items-center justify-center md:flex">
          <Link 
            href="/items" 
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-red-600"
          >
            Browse Items
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <ThemeToggle />
          
          {!session ? (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className={buttonVariants({ variant: "ghost", size: "sm", className: "hidden sm:inline-flex font-medium hover:text-red-600" })}
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className={buttonVariants({ size: "sm", className: "font-medium bg-red-600 hover:bg-red-700 text-white shadow-sm border-0" })}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <UserNav user={session.user} />
          )}
        </div>
        
      </div>
    </nav>
  );
};