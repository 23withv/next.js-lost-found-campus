import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface FilterOption {
  label: string
  value: string
}

interface SearchFilterBarProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  searchPlaceholder?: string
  filterOptions?: FilterOption[]
  currentFilter?: string
  onFilterChange?: (val: string) => void
}

export function SearchFilterBar({
  searchQuery,
  setSearchQuery,
  searchPlaceholder = "Search...",
  filterOptions,
  currentFilter,
  onFilterChange,
}: SearchFilterBarProps) {
  const showFilter = filterOptions && filterOptions.length > 0 && currentFilter && onFilterChange

  return (
    <div 
      className={cn(
        "flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm",
        showFilter ? "md:flex-row md:items-center md:justify-between" : "md:flex-row md:items-center md:justify-end"
      )}
    >
      {showFilter && (
        <div className="flex w-full rounded-lg bg-muted p-1 md:w-auto">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange(opt.value)}
              className={cn(
                "flex-1 rounded-md px-6 py-2 text-sm font-semibold transition-all duration-200",
                currentFilter === opt.value
                  ? "bg-background text-foreground shadow-sm ring-1 ring-black/5"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="relative w-full md:w-80 h-10">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70 pointer-events-none z-10" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-11 h-full border-0 bg-muted/50 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-red-500 w-full transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  )
}