"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { PaginationControls } from "@/components/ui/pagination-controls"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ItemsManagementTableProps {
  items: any[]
}

const FILTER_OPTIONS = [
  { label: "ALL", value: "ALL" },
  { label: "LOST", value: "LOST" },
  { label: "FOUND", value: "FOUND" },
]

export function ItemsManagementTable({ items }: ItemsManagementTableProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    setCurrentPage(1)
  }, [search, filter])

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          (item.reporter?.name || "").toLowerCase().includes(search.toLowerCase())
    const matchesType = filter === "ALL" || item.type === filter
    return matchesSearch && matchesType
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-6">
      <SearchFilterBar
        searchQuery={search}
        setSearchQuery={setSearch}
        searchPlaceholder="Search by title or reporter..."
        filterOptions={FILTER_OPTIONS}
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 w-12 text-center">No</th>
                <th className="px-6 py-4">Item Details</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Reporter</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedItems.map((item, index) => {
                const actualIndex = (currentPage - 1) * itemsPerPage + index + 1
                
                return (
                  <tr key={item._id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 text-center font-medium text-muted-foreground">
                      {actualIndex}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground line-clamp-1">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{format(new Date(item.date), "MMM dd, yyyy")} • {item.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={item.type === "FOUND" ? "found" : "lost"} className="uppercase font-bold">
                        {item.type}
                      </Badge>                
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{item.reporter?.name || "Anonymous"}</span>
                        <span className="text-xs text-muted-foreground">{item.reporter?.email || "No email"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant={item.status?.toLowerCase() as any} 
                        className="uppercase font-bold"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/dashboard/items/${item.slug}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-8 px-3 font-bold text-[10px] uppercase tracking-widest border-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                        )}
                      >
                        <Eye className="h-3.5 w-3.5 mr-2" />
                        View Details
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredItems.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}