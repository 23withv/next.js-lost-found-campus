import { getAllItems } from "@/services/adminService";
import { DataTable } from "@/components/admin/data-table";
import { itemsColumns } from "@/components/admin/columns";

export default async function ManageItemsPage() {
  const items = await getAllItems();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Item Management</h1>
      </div>
      <DataTable columns={itemsColumns} data={items} filterKey="title" />
    </div>
  );
}