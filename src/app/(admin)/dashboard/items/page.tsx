import { getAllItems } from "@/services/adminService";
import { ItemsManagementTable } from "@/components/admin/items/items-management-table";

export const dynamic = "force-dynamic";

export default async function ManageItemsPage() {
  const items = await getAllItems();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manage Items</h2>
        <p className="text-muted-foreground mt-2">
          Filter, review, and update the status of reported items.
        </p>
      </div>
      <ItemsManagementTable items={items} />
    </div>
  );
}
