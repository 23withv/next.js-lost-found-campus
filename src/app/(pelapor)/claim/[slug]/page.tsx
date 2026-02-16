import { auth } from "@/auth";
import { getItemBySlug } from "@/services/itemService";
import { notFound, redirect } from "next/navigation";
import { MapPin, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClaimForm } from "@/components/pelapor/claims/claim-form";
import { StandardImage } from "@/components/ui/standard-image";

interface ClaimPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function ClaimPage({ params }: ClaimPageProps) {
  const session = await auth();

  if (!session?.user || session.user.role !== "PELAPOR") {
    redirect("/");
  }

  const resolvedParams = await params;
  const item = await getItemBySlug(resolvedParams.slug);

  if (!item || item.type !== "FOUND") {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8 pb-12 min-h-screen">
      <div className="space-y-1 mb-8 pt-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-4 uppercase italic">
          Claim Verification
        </h1>
        <p className="text-muted-foreground font-medium">
          Follow the instructions below to complete your ownership validation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <Card className="overflow-hidden shadow-sm border-2">
            <StandardImage 
              src={item.images?.[0]} 
              aspectRatio="video" 
              alt={item.title}
              className="border-b-2"
            />
            
            <CardContent className="p-6 space-y-4 bg-card">
              <h2 className="text-xl font-extrabold text-foreground tracking-tight line-clamp-2 uppercase">
                {item.title}
              </h2>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Location Found
                    </span>
                    <span className="text-sm font-semibold text-foreground truncate">
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Date Found
                    </span>
                    <span className="text-sm font-semibold text-foreground truncate">
                      {format(new Date(item.date), "PPP")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Tag className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Category
                    </span>
                    <Badge variant="outline" className="w-fit mt-1 font-bold border-2">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <ClaimForm itemId={item._id.toString()} />
        </div>
      </div>
    </div>
  );
}