"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";

interface ItemCardProps {
  item: any;
  currentUser: any;
}

export function ItemCard({ item, currentUser }: ItemCardProps) {
  const router = useRouter();

  const handleClaim = () => {
    if (!currentUser) {
      router.push("/login?callbackUrl=/items");
      return;
    }
    console.log("Claiming item:", item._id);
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden border-border/50 bg-background transition-all hover:shadow-lg hover:border-border">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted/30">
        {item.images && item.images.length > 0 ? (
          <Image 
            src={item.images[0]} 
            alt={item.title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
        
        <div className="absolute left-3 top-3 z-10">
          <Badge 
            className={`px-2.5 py-0.5 text-xs font-semibold shadow-sm backdrop-blur-md ${
              item.type === "FOUND" 
                ? "bg-emerald-500/90 hover:bg-emerald-600 text-white border-transparent" 
                : "bg-red-500/90 hover:bg-red-600 text-white border-transparent"
            }`}
          >
            {item.type === "LOST" ? "LOST ITEM" : "FOUND ITEM"}
          </Badge>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground group-hover:text-red-600 transition-colors">
            {item.title}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
              <User className="h-3 w-3" />
            </div>
            <span>Anonymous Reporter</span>
          </div>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-red-500/70" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0 text-blue-500/70" />
            <span>{format(new Date(item.date), "MMMM dd, yyyy")}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleClaim}
          className={`w-full font-semibold shadow-sm transition-all ${
            item.type === "LOST" 
              ? "variant-outline border-slate-200 hover:bg-slate-50 hover:text-red-600 text-foreground" 
              : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900"
          }`}
          variant={item.type === "LOST" ? "outline" : "default"}
        >
          {item.type === "LOST" ? "I Found This" : "Claim Item"}
        </Button>
      </CardFooter>
    </Card>
  );
}