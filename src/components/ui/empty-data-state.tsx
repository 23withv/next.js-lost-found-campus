import { PackageOpen, XCircle, LucideIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyDataStateProps {
  icon?: LucideIcon
  title?: string
  message: React.ReactNode
  showClearButton?: boolean
  onClear?: () => void
}

export function EmptyDataState({
  icon: Icon = PackageOpen,
  title = "No results found",
  message,
  showClearButton = false,
  onClear
}: EmptyDataStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted bg-white/50 dark:bg-slate-950/50 pt-12 pb-20 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/50 dark:bg-red-950/30">
        <Icon className="h-12 w-12 text-muted-foreground dark:text-red-400" />
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-foreground">{title}</h3>
      
      <div className="mt-3 text-muted-foreground max-w-md text-lg">
        {message}
      </div>
      
      {showClearButton && onClear && (
        <button 
          onClick={onClear}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }), 
            "mt-10 font-semibold shadow-sm"
          )}
        >
          <XCircle className="mr-2 h-5 w-5" />
          Clear Filters
        </button>
      )}
    </div>
  )
}