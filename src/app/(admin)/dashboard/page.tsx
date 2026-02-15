import { getDashboardStats } from "@/services/adminService"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, CheckCircle, AlertOctagon, Users, ShieldCheck } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DashboardOverviewPage() {
  const stats = await getDashboardStats()

  const statCards = [
    { label: "Total Reports", value: stats.totalItems, icon: Package, color: "text-blue-600" },
    { label: "Found Items", value: stats.foundItems, icon: CheckCircle, color: "text-emerald-600" },
    { label: "Lost Items", value: stats.lostItems, icon: AlertOctagon, color: "text-red-600" },
    { label: "Claimed Items", value: stats.claimedItems, icon: ShieldCheck, color: "text-purple-600" },
    { label: "Registered Users", value: stats.totalUsers, icon: Users, color: "text-slate-600" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-2">Monitor campus lost and found statistics and activities.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}