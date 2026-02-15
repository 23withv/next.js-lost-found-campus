"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: any;
  currentUser: any;
}

export function ItemCard({ item, currentUser }: ItemCardProps) {
  const imageUrl = item.images?.[0] || "";
  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <Card className="group relative flex flex-col overflow-hidden border-border/50 bg-background transition-all hover:shadow-lg hover:border-border">
      <div 
        className="relative w-full overflow-hidden bg-muted/30" 
        style={{ aspectRatio: "4/3" }}
      >
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={item.title || "Item Image"} 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized 
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <User className="h-8 w-8 opacity-20" />
            <span className="text-xs font-medium">No Image Available</span>
          </div>
        )}        
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
            <span>Anonymous Reporter</span> 
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

      <CardFooter className="px-3 pb-3 pt-0">
        {isAdmin ? (
          <Link
            href={`/dashboard/items/${item._id}`}
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "w-full bg-slate-900 text-white hover:bg-slate-800"
            )}
          >
            Manage Item
          </Link>
        ) : (
          <Link
            href={`/items/${item._id}`}
            className={cn(
              buttonVariants({ 
                variant: item.type === "LOST" ? "outline" : "default",
                size: "sm" 
              }),
              "w-full font-bold h-9 transition-all", 
              item.type === "LOST" 
                ? "border-slate-200 hover:bg-slate-50 hover:text-red-600" 
                : "bg-slate-900 text-white hover:bg-slate-800"
            )}
          >
            {item.type === "LOST" ? "I Found This" : "Claim Item"}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}