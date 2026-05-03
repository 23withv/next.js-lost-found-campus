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

      <div className="relative w-full md:w-80 lg:w-96">
        <div className="flex items-center rounded-md border border-input bg-muted/50 px-3 py-1.5 transition-colors focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground mr-3" /> 
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0", 
              "placeholder:text-muted-foreground text-sm"
            )}
          />
        </div>
      </div>
    </div>
  )
}