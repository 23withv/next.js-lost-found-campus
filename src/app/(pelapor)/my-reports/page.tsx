import { auth } from "@/auth";
import { getReportsByUserId } from "@/services/itemService";
import { MyReportsList } from "@/components/pelapor/my-reports-list";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MyReportsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const reports = await getReportsByUserId(session.user.id);

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-10 space-y-2 border-l-4 border-red-600 pl-4">
        <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">
          My Reports
        </h1>
        <p className="text-muted-foreground">
          Track and manage all the items you have reported.
        </p>
      </div>

      <MyReportsList reports={reports} />
    </div>
  );
}