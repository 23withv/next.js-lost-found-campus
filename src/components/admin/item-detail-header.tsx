import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface ItemDetailHeaderProps {
  item: any
}

export function ItemDetailHeader({ item }: ItemDetailHeaderProps) {
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
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Report #{item._id.slice(-6).toUpperCase()}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="px-3 py-1.5 text-xs uppercase tracking-widest font-bold bg-background">
          {item.status}
        </Badge>
        <Badge className={cn(
          "px-3 py-1.5 text-xs font-bold text-white border-none shadow-sm",
          item.type === "FOUND" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"
        )}>
          {item.type}
        </Badge>
      </div>
    </div>
  )
}