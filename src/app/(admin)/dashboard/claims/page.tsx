import { getAllClaims } from "@/services/adminService";
import { ClaimsManagementTable } from "@/components/admin/claims/claims-management-table";

export const dynamic = "force-dynamic";

export default async function ManageClaimsPage() {
  const claims = await getAllClaims();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manage Claims</h2>
        <p className="text-muted-foreground mt-2">
          Verify ownership proofs submitted by users.
        </p>
      </div>
      <ClaimsManagementTable claims={claims} />
    </div>
  );
}
