import { auth } from "@/auth";
import { getItemBySlug } from "@/services/itemService";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClaimForm } from "@/components/pelapor/claims/claim-form";

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

  // Ambil data menggunakan fungsi service bySlug
  const item = await getItemBySlug(resolvedParams.slug);

  if (!item || item.type !== "FOUND") {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8 pb-12 min-h-screen">
      <div className="space-y-1 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-4">
          Claim Item
        </h1>
        <p className="text-muted-foreground">
          Complete the verification process to claim this item.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <Card className="overflow-hidden shadow-sm border">
            <div className="relative w-full aspect-video bg-muted border-b">
              {item.images?.[0] ? (
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            <CardContent className="p-6 space-y-4 bg-card">
              <h2 className="text-xl font-extrabold text-foreground tracking-tight line-clamp-2">
                {item.title}
              </h2>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      Location
                    </span>
                    <span className="text-sm font-medium text-foreground truncate">
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      Date Found
                    </span>
                    <span className="text-sm font-medium text-foreground truncate">
                      {format(new Date(item.date), "PPP")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      Category
                    </span>
                    <Badge variant="outline" className="w-fit mt-0.5">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          {/* PENTING: Komponen form tetap menerima ObjectId murni untuk disimpan di database Claim */}
          <ClaimForm itemId={item._id.toString()} />
        </div>
      </div>
    </div>
  );
}
