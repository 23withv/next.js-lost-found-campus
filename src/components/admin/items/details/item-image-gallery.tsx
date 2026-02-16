"use client"

import { format } from "date-fns"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { StandardImage } from "@/components/ui/standard-image"

interface ItemImageGalleryProps {
  item: any
}

export function ItemImageGallery({ item }: ItemImageGalleryProps) {
  const images = Array.isArray(item.images) ? item.images.filter(Boolean) : []
  const hasImages = images.length > 0

  return (
    <Card className="overflow-hidden shadow-sm border">
      <div className="flex flex-col">
        <StandardImage 
          src={images[0]} 
          aspectRatio="video" 
          alt={item.title} 
        />

        {images.length > 1 && (
          <div className="bg-muted/10 p-4 border-b">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max gap-3 pb-2">
                {images.map((img: string, idx: number) => (
                  <div key={idx} className="w-32">
                    <StandardImage 
                      src={img} 
                      aspectRatio="square" 
                      className="rounded-md border bg-background cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="h-2" />
            </ScrollArea>
          </div>
        )}
      </div>

      <CardContent className="bg-card pt-6">
        <h2 className="text-2xl font-extrabold text-foreground mb-2 tracking-tight uppercase italic">
          {item.title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <Clock className="h-4 w-4" />
          <span>Reported on {format(new Date(item.date || item.createdAt), "MMMM do, yyyy")}</span>
        </div>
      </CardContent>
    </Card>
  )
}