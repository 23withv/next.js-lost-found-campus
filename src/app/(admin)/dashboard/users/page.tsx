import { getAllUsers } from "@/services/adminService"
import { UsersManagementTable } from "@/components/admin/users/users-management-table"

export const dynamic = "force-dynamic"

export default async function ManageUsersPage() {
  const users = await getAllUsers()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          User Management
        </h2>
        <p className="text-muted-foreground mt-2">
          View and manage all registered accounts within the system.
        </p>
      </div>

      <UsersManagementTable users={users} />
    </div>
  )
}