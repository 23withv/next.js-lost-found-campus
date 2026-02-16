import { getClaimById } from "@/services/adminService";
import { notFound } from "next/navigation";
import { ClaimActionControls } from "@/components/admin/claims/claim-action-controls";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface ClaimReviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClaimReviewPage({
  params,
}: ClaimReviewPageProps) {
  const resolvedParams = await params;
  const claim = await getClaimById(resolvedParams.id);

  if (!claim) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      <div className="space-y-1">
        <Link
          href="/dashboard/claims"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Claims
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight">Review Claim</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card shadow-sm p-6">
            <h3 className="text-lg font-bold border-b pb-3 mb-4">
              Proof of Ownership
            </h3>
            <div className="bg-muted/30 p-4 rounded-lg border border-muted">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {claim.proofDescription}
              </p>
            </div>

            {claim.alternateContact && (
              <div className="mt-6">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Alternate Contact
                </h4>
                <p className="text-sm font-medium">{claim.alternateContact}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-bold border-b pb-3">Status</h3>
            <Badge
              variant="outline"
              className="uppercase font-bold w-full justify-center py-1.5 text-xs"
            >
              {claim.status}
            </Badge>

            {claim.status === "PENDING" ? (
              <ClaimActionControls claimId={claim._id.toString()} />
            ) : (
              <div className="bg-muted p-3 rounded-md text-sm mt-4">
                <span className="font-bold text-muted-foreground block mb-1">
                  Admin Feedback:
                </span>
                {claim.adminFeedback || "No feedback provided."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
