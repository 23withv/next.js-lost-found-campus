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
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 border-l-4 border-red-600 pl-5 md:pl-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
            My Reporting History
          </h1>
          <p className="mt-2 text-lg text-muted-foreground font-medium leading-relaxed">
            Manage and track all items you have contributed to the campus network.
          </p>
        </div>

        <div className="pt-6 md:pt-8 lg:pt-10">
          <MyReportsList reports={reports} />
        </div>
      </div>
    </div>
  );
}