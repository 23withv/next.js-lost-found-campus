import Link from "next/link";
import { Search, ShieldCheck, UploadCloud, ArrowRight, PackageOpen } from "lucide-react";
import { auth } from "@/auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { getItems } from "@/services/itemService";
import { ItemCard } from "@/components/items/item-card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [session, allItems] = await Promise.all([
    auth(),
    getItems()
  ]);

  const recentItems = allItems.slice(0, 8);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-red-100 selection:text-red-900">
      
      <Navbar />

      <main className="flex-1">
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
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-4">
              <div className="space-y-1">
                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  Recently Reported
                </h2>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Help your peers find their lost belongings.
                </p>
              </div>
              <Link 
                href="/items" 
                className="group flex shrink-0 items-center text-sm font-semibold text-red-600 transition-colors hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
              >
                View More
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex w-full snap-x snap-mandatory scroll-smooth overflow-x-auto pb-8 pt-4 gap-6 items-stretch [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-track]:bg-transparent">
              {recentItems.length > 0 ? (
                recentItems.map((item: any) => (
                  <div key={item._id} className="w-62.5 shrink-0 snap-start sm:w-70">
                    <ItemCard item={item} currentUser={session?.user} />
                  </div>
                ))
              ) : (
                <div className="flex w-full min-h-62.5 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted bg-muted/30 py-12 text-center text-muted-foreground">
                  <PackageOpen className="mb-4 h-10 w-10 text-muted-foreground/50" />
                  <p className="font-medium text-foreground">No items reported yet.</p>
                  <p className="text-sm">Be the first to report a lost or found item.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-8 space-y-12">
            <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                How it Works
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                We make sure that every item is carefully verified before being returned to its rightful owner.
              </p>
            </div>

            <div className="mx-auto grid gap-6 sm:grid-cols-2 md:max-w-6xl md:grid-cols-3 lg:gap-8">
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

              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-red-200 dark:hover:border-red-900">
                <div className="flex flex-col justify-between space-y-4 h-full">
                  <div className="rounded-full bg-red-100 w-fit p-3 group-hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:group-hover:bg-red-900/40">
                    <Search className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">Quick Search</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Easily search through all reported items to find a match for your missing belongings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-red-200 dark:hover:border-red-900">
                <div className="flex flex-col justify-between space-y-4 h-full">
                  <div className="rounded-full bg-red-100 w-fit p-3 group-hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:group-hover:bg-red-900/40">
                    <ShieldCheck className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">Secure Claim</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Items are safely returned to their owners after a quick verification step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background py-4">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-8 md:h-16 md:flex-row">
          <p className="text-center text-xs leading-loose text-muted-foreground md:text-left">
            Built for <strong>Internship Project</strong>. &copy; {new Date().getFullYear()} Campus Lost & Found.
          </p>
        </div>
      </footer>
    </div>
  );
}