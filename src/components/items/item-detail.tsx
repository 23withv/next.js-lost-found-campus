"use client"

import { format } from "date-fns"
import Link from "next/link"
import { MapPin, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ClaimButton } from "@/components/items/claim-button"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { StandardImage } from "@/components/ui/standard-image"

interface ItemDetailProps {
  item: any
  currentUser: any
}

export function ItemDetail({ item, currentUser }: ItemDetailProps) {
  const isAdmin = currentUser?.role === "ADMIN"
  const isAuthenticated = !!currentUser
  const isOwner = isAuthenticated && (item.reporter?._id?.toString() === currentUser.id || item.reporter?.toString() === currentUser.id)
  
  const itemType = item.type?.toUpperCase()

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7 space-y-6">
          <StandardImage 
            src={item.images?.[0]} 
            aspectRatio="video" 
            alt={item.title} 
            className="rounded-2xl border-2 shadow-sm"
          />

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase italic">
              {item.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              <Badge variant={itemType === "FOUND" ? "found" : "lost"} className="px-4 py-1 font-bold tracking-widest uppercase">
                {itemType}
              </Badge>
              <Badge variant="outline" className="px-4 py-1 font-bold border-2">
                {item.category}
              </Badge>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap pt-4">
              {item.description}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="rounded-2xl border-2 shadow-sm overflow-hidden sticky top-24">
            <div className="p-2 border-b">
              <h3 className="font-bold uppercase tracking-widest text-xs text-muted-foreground">Item Specification</h3>
            </div>
            <CardContent className="pe-10 space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Location</p>
                  <p className="font-semibold text-foreground">{item.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Date Reported</p>
                  <p className="font-semibold text-foreground">{format(new Date(item.date), "PPPP")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-dashed">
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Reported By</p>
                  <p className="font-semibold text-foreground italic">
                    {isOwner ? "You (Reporter)" : "Anonymous Reporter"}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                {isAdmin ? (
                  <Link
                    href={`/dashboard/items/${item.slug}`}
                    className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full bg-slate-900 hover:bg-slate-800 font-bold uppercase h-12")}
                  >
                    Manage Item
                  </Link>
                ) : isOwner ? (
                  <Link
                    href="/my-reports"
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-2 font-bold uppercase h-12 hover:bg-red-50 hover:text-red-600 transition-all")}
                  >
                    All My Reports
                  </Link>
                ) : item.type === "FOUND" ? (
                  <ClaimButton 
                    itemId={item._id.toString()}
                    itemSlug={item.slug}
                    isAuthenticated={isAuthenticated} 
                    userRole={currentUser?.role} 
                  />
                ) : (
                  <div className="p-4 rounded-xl bg-muted text-center italic text-sm text-muted-foreground border border-dashed">
                    This item is lost. If you find it, please submit a "Found" report.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}