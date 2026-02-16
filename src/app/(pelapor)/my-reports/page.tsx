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
    <div className="container mx-auto max-w-6xl px-4 py-10 md:py-16 min-h-screen">
      <div className="mb-10 flex items-center gap-4 border-l-4 border-red-600 pl-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <FileText className="h-6 w-6 text-red-600 dark:text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-foreground uppercase">
            My Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all the items you have reported across the campus.
          </p>
        </div>
      </div>

      <MyReportsList reports={reports} />
    </div>
  );
}
