import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Info, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ItemImageGalleryProps {
  item: any
}

export function ItemImageGallery({ item }: ItemImageGalleryProps) {
  const images = Array.isArray(item.images) ? item.images.filter(Boolean) : []
  const hasImages = images.length > 0

  return (
    <Card className="overflow-hidden shadow-sm border">
      {hasImages ? (
        <div className="flex flex-col">
          <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] bg-muted border-b relative overflow-hidden">
            <Image
              src={images[0]}
              alt={item.title || "Item Image"}
              width={1200}
              height={450}
              className={cn(
                "w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              )}
              priority
              quality={85}
              unoptimized
            />
          </div>

          {images.length > 1 && (
            <div className="bg-muted/10 p-4 border-b">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max gap-3 pb-2">
                  {images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative h-20 w-32 rounded-md overflow-hidden border bg-background shrink-0 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    >
                      <Image
                        src={img}
                        alt={`${item.title} Thumbnail ${idx + 1}`}
                        width={128}
                        height={80}
                        className="w-full h-full object-cover"
                        quality={75}
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-2" />
              </ScrollArea>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[300px] sm:h-[400px] w-full bg-muted/50 flex flex-col items-center justify-center border-b">
          <Info className="h-10 w-10 text-muted-foreground/40 mb-2" />
          <span className="text-sm font-medium text-muted-foreground">No Image Provided</span>
        </div>
      )}

      <CardContent className="bg-card">
        <h2 className="text-2xl font-extrabold text-foreground mb-2 tracking-tight">
          {item.title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <Clock className="h-4 w-4" />
          <span>Reported on {format(new Date(item.date || item.createdAt), "MMMM do, yyyy 'at' h:mm a")}</span>
        </div>
      </CardContent>
    </Card>
  )
}