import { getDashboardStats, getAllItems, getAllClaims } from "@/services/adminService"
import { Card } from "@/components/ui/card"
import { Package, CheckCircle, AlertOctagon, Users, ShieldCheck } from "lucide-react"
import { RecentItems } from "@/components/admin/dashboard/recent-items"
import { RecentClaims } from "@/components/admin/dashboard/recent-claims"

export const dynamic = "force-dynamic"

export default async function DashboardOverviewPage() {
  const [stats, allItems, allClaims] = await Promise.all([
    getDashboardStats(),
    getAllItems(),
    getAllClaims()
  ])

  const recentItems = allItems.slice(0, 5)
  const recentClaims = allClaims.slice(0, 5)

  const statCards = [
    { label: "Total Reports", value: stats.totalItems, icon: Package, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Found Items", value: stats.foundItems, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Lost Items", value: stats.lostItems, icon: AlertOctagon, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
    { label: "Claimed Items", value: stats.claimedItems, icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { label: "Users", value: stats.totalUsers, icon: Users, color: "text-slate-600", bg: "bg-slate-100 dark:bg-slate-800" },
  ]

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          Monitor campus lost and found statistics and recent activities.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {statCards.map((stat, i) => (
          <Card key={i} className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border bg-card">
            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground truncate pr-1">
                  {stat.label}
                </span>
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${stat.bg}`}>
                  <stat.icon className={`h-3 w-3 ${stat.color}`} />
                </div>
              </div>
              <div className="text-xl font-black tracking-tight text-foreground">
                {stat.value}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        <RecentItems items={recentItems} />
        <RecentClaims claims={recentClaims} />
      </div>
    </div>
  )
}