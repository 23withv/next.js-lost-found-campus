import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Tag } from "lucide-react"
import { format } from "date-fns"

interface ItemMetadataCardProps {
  item: any
}

export function ItemMetadataCard({ item }: ItemMetadataCardProps) {
  return (
    <Card className="shadow-sm border">
      <CardHeader className="bg-muted/20 border-b">
        <CardTitle className="text-base font-semibold">Item Metadata</CardTitle>
      </CardHeader>
      <CardContent className="pe-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Exact Location</span>
            <span className="text-sm font-medium text-foreground leading-snug">{item.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Event Date</span>
            <span className="text-sm font-medium text-foreground leading-snug">{format(new Date(item.date), "PPP")}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Tag className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Category</span>
            <Badge variant="outline" className="w-fit font-semibold text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900">
              {item.category}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}