import { auth } from "@/auth";
import { getReportsByUserId } from "@/services/itemService";
import { MyReportsList } from "@/components/pelapor/my-reports-list";
import { redirect } from "next/navigation";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MyReportsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const reports = await getReportsByUserId(session.user.id);

  return (
    <div className="min-h-screen">
      <div className="mb-10 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-red-600" />
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase italic">
            My Reporting History
          </h1>
        </div>
        <p className="text-muted-foreground font-medium">
          Manage and track all items you have contributed to the campus network.
        </p>
      </div>

      <MyReportsList reports={reports} />
    </div>
  );
}