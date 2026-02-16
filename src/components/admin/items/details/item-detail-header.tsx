import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

interface ItemDetailHeaderProps {
  item: any
}

export function ItemDetailHeader({ item }: ItemDetailHeaderProps) {
  const itemType = item.type?.toUpperCase();
  const itemStatus = item.status?.toLowerCase();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <Link 
          href="/dashboard/items" 
          className="group flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Inventory
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground line-clamp-1">
          {item.title}
        </h1>
        <p className="text-sm font-mono text-muted-foreground">
          ID: {item._id.slice(-6).toUpperCase()}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={itemStatus as any} className="px-3 py-1.5 text-xs uppercase tracking-widest font-bold shadow-sm">
          {item.status}
        </Badge>
        
        <Badge 
          variant={itemType === "FOUND" ? "found" : itemType === "LOST" ? "lost" : "default"}
          className="px-3 py-1.5 text-xs font-bold border-none"
        >
          {itemType || "UNKNOWN"}
        </Badge>
      </div>
    </div>
  )
}