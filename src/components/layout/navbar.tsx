import Link from "next/link";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button, buttonVariants } from "@/components/ui/button";

export const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <div className="text-xl font-black tracking-tighter text-red-600">
            <Link href="/">CAMPUS L&F</Link>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            <Link 
              href="/items" 
              className={buttonVariants({ variant: "ghost", size: "sm", className: "font-medium" })}
            >
              Browse Items
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!session ? (
            <>
              <Link 
                href="/login" 
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className={buttonVariants({ variant: "default", size: "sm", className: "bg-red-600 hover:bg-red-700" })}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600 hidden sm:block">
                Hi, {session.user?.name?.split(" ")[0]}
              </span>
              <LogoutButton>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  Sign Out
                </Button>
              </LogoutButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};