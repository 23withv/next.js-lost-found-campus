"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"
import { PaginationControls } from "@/components/ui/pagination-controls"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ItemsManagementTableProps {
  items: any[]
}

export function ItemsManagementTable({ items }: ItemsManagementTableProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"ALL" | "LOST" | "FOUND">("ALL")
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
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex w-full rounded-lg bg-muted p-1 md:w-auto">
          {["ALL", "LOST", "FOUND"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={cn(
                "flex-1 rounded-md px-6 py-2 text-sm font-semibold transition-all duration-200",
                filter === type
                  ? "bg-background text-foreground shadow-sm ring-1 ring-black/5"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or reporter..."
            className="h-10 border-0 bg-muted/50 pl-9 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-red-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Item Details</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Reporter</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedItems.map((item) => (
                <tr key={item._id} className="hover:bg-muted/20 transition-colors">
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
                      className={buttonVariants({ variant: "ghost", size: "icon" })}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </td>
                </tr>
              ))}
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