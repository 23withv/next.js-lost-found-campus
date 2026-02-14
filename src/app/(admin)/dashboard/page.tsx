import { getDashboardStats, getAllItems } from "@/services/adminService";
import { DataTable } from "@/components/admin/data-table";
import { itemsColumns } from "@/components/admin/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, AlertOctagon, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const recentItems = await getAllItems();

  const statCards = [
    { label: "Total Reports", value: stats.totalItems, icon: Package, color: "text-blue-600" },
    { label: "Found Items", value: stats.foundItems, icon: CheckCircle, color: "text-emerald-600" },
    { label: "Lost Items", value: stats.lostItems, icon: AlertOctagon, color: "text-red-600" },
    { label: "Registered Users", value: stats.totalUsers, icon: Users, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Recent Submissions</h2>
        <DataTable columns={itemsColumns} data={recentItems} filterKey="title" />
      </div>
    </div>
  );
}