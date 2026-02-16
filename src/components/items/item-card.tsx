"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Calendar, User, Eye } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClaimButton } from "./claim-button";
import { StandardImage } from "../ui/standard-image";

interface ItemCardProps {
  item: any;
  currentUser: any;
}

export function ItemCard({ item, currentUser }: ItemCardProps) {
  const imageUrl = item.images?.[0] || "";

  const isAdmin = currentUser?.role === "ADMIN";
  const isAuthenticated = !!currentUser;

  const isOwner = isAuthenticated && 
    (item.reporter?._id?.toString() === currentUser.id || item.reporter?.toString() === currentUser.id);
  
    const renderActionButtons = () => {
    if (isAdmin) {
      return (
        <Link
          href={`/dashboard/items/${item.slug}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "w-full bg-slate-900 text-white hover:bg-slate-800"
          )}
        >
          Manage Item
        </Link>
      );
    }

    if (isOwner) {
      return (
        <Link
          href={`/my-reports`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-full font-bold h-9 transition-all border-slate-200 hover:bg-slate-50 hover:text-red-600"
          )}
        >
          <Eye className="mr-2 h-4 w-4" />
          All My Reports
        </Link>
      );
    }

    if (item.type === "FOUND") {
      return (
        <ClaimButton 
          itemId={item._id.toString()}
          itemSlug={item.slug}
          isAuthenticated={isAuthenticated} 
          userRole={currentUser?.role} 
        />
      );
    }

    if (item.type === "LOST") {
      return (
        <Link
          href={`/items/${item.slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-full font-bold h-9 transition-all border-slate-200 hover:bg-slate-50 hover:text-red-600"
          )}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Link>
      );
    }

    return null;
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden border-border/50 bg-background transition-all hover:shadow-lg hover:border-border">
      <div className="relative w-full">
        <Link href={`/items/${item.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">View Details</span>
        </Link>

        <StandardImage 
          src={item.images?.[0]} 
          aspectRatio="card" 
          alt={item.title} 
        />
      </div>

      <CardContent className="flex flex-1 flex-col gap-1.5 px-3 pt-1.5 pb-1.5">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground group-hover:text-red-600 transition-colors">
            {item.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
              <User className="h-3 w-3 shrink-0" />
            </div>
            <span>{isOwner ? "You (Reporter)" : "Anonymous Reporter"}</span> 
          </div>
        </div>

        <div className="mt-auto space-y-1 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
              <MapPin className="h-3 w-3 shrink-0 text-red-500/70" />
            </div>
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
              <Calendar className="h-3 w-3 shrink-0 text-blue-500/70" />
            </div>
            <span>{format(new Date(item.date), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-3 pb-3 pt-0 relative z-20">
        {renderActionButtons()}
      </CardFooter>
    </Card>
  );
}