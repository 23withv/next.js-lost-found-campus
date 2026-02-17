import { getAllUsers } from "@/services/adminService"
import { UsersManagementTable } from "@/components/admin/users/users-management-table"

export const dynamic = "force-dynamic"

export default async function ManageUsersPage() {
  const users = await getAllUsers()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">
          User Management
        </h2>
        <p className="text-muted-foreground font-medium mt-1">
          View and manage all registered accounts within the system.
        </p>
      </div>

      <UsersManagementTable users={users} />
    </div>
  )
}