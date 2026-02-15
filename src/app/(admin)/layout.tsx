import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { DynamicBreadcrumbs } from "@/components/admin/dynamic-breadcrumbs"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-slate-50/50 min-h-screen dark:bg-slate-950">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-6 sticky top-0 z-10 dark:bg-slate-900">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <DynamicBreadcrumbs />
          </Breadcrumb>
        </header>
        <div className="p-4 md:p-8 pt-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}