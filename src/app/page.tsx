import Link from "next/link";
import { Search, ShieldCheck, UploadCloud, ArrowRight } from "lucide-react"; // Tambah ArrowRight
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-red-100 selection:text-red-900">
      
      {/* --- Header / Navbar --- */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          
          {/* GROUP KIRI: LOGO + NAV MENU */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-2xl font-black tracking-tighter text-red-600 dark:text-red-500">
                CAMPUS L&F
              </span>
            </Link>

            {/* Menu Links (Desktop Only) */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/items" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-red-600"
              >
                Browse Items
              </Link>
            </nav>
          </div>
          
          {/* GROUP KANAN: THEME + AUTH */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            
            {!session ? (
              <div className="flex items-center gap-2">
                <Link 
                  href="/login" 
                  className={buttonVariants({ variant: "ghost", size: "sm", className: "hidden sm:inline-flex font-medium hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" })}
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className={buttonVariants({ size: "sm", className: "font-medium bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 border-0" })}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="hidden text-sm font-medium text-muted-foreground sm:block">
                  Hi, {session.user?.name?.split(" ")[0]} 
                </span>
                
                <LogoutButton>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="font-medium border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:bg-transparent dark:text-red-500 dark:hover:bg-red-950/30"
                  >
                    Sign Out
                  </Button>
                </LogoutButton>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* --- Hero Section --- */}
        <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
          <div className="absolute top-0 z-[-1] h-full w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(220,38,38,0.1)_0,rgba(255,255,255,0)_50%,rgba(255,255,255,0)_100%)] dark:bg-slate-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(127,29,29,0.2),rgba(255,255,255,0))]"></div>

          <div className="container mx-auto px-4 sm:px-8 flex max-w-5xl flex-col items-center gap-6 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Lost something? <br className="hidden md:block" />
              <span className="text-red-600 drop-shadow-sm dark:text-red-500">We help you find it.</span>
            </h1>
            
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
              The official campus portal for reporting lost and found items. 
              Connects students, staff, and security to recover belongings efficiently.
            </p>
            
            <div className="flex w-full flex-col gap-4 pt-4 sm:w-auto sm:flex-row sm:justify-center">
              <Link 
                href="/report/found" 
                className={buttonVariants({ 
                  size: "lg", 
                  className: "w-full sm:w-50 h-14 text-base font-bold shadow-xl shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white transition-all hover:scale-[1.02] active:scale-[0.98]" 
                })}
              >
                I Found Something
              </Link>
              
              <Link 
                href="/report/lost" 
                className={buttonVariants({ 
                  variant: "outline", 
                  size: "lg", 
                  className: "w-full sm:w-50 h-14 text-base font-bold bg-background/50 backdrop-blur-sm border-2 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-[1.02] active:scale-[0.98]" 
                })}
              >
                I Lost Something
              </Link>
            </div>
            
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <Link href="/items" className="group flex items-center text-sm font-semibold text-muted-foreground hover:text-red-600 transition-colors">
                    Browse all items without reporting
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section className="border-t bg-muted/30 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-8 space-y-12">
            <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                How it Works
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our system ensures that every item is verified before being returned to its owner.
              </p>
            </div>

            <div className="mx-auto grid gap-6 sm:grid-cols-2 md:max-w-6xl md:grid-cols-3 lg:gap-8">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-red-200 dark:hover:border-red-900">
                <div className="flex flex-col justify-between space-y-4 h-full">
                  <div className="rounded-full bg-red-100 w-fit p-3 group-hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:group-hover:bg-red-900/40">
                    <UploadCloud className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">Report Items</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Upload photos and details of items you found or lost around campus.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-red-200 dark:hover:border-red-900">
                <div className="flex flex-col justify-between space-y-4 h-full">
                  <div className="rounded-full bg-red-100 w-fit p-3 group-hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:group-hover:bg-red-900/40">
                    <Search className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">Smart Search</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Browse the database to find matches for your missing belongings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-red-200 dark:hover:border-red-900">
                <div className="flex flex-col justify-between space-y-4 h-full">
                  <div className="rounded-full bg-red-100 w-fit p-3 group-hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:group-hover:bg-red-900/40">
                    <ShieldCheck className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">Secure Claim</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Items are returned only after verification by our admin team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-8 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for <strong>Internship Project</strong>. &copy; {new Date().getFullYear()} Campus Lost & Found.
          </p>
        </div>
      </footer>
    </div>
  );
}