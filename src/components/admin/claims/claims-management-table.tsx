"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { PaginationControls } from "@/components/ui/pagination-controls"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"

interface ClaimsManagementTableProps {
  claims: any[]
}

const FILTER_OPTIONS = [
  { label: "ALL", value: "ALL" },
  { label: "PENDING", value: "PENDING" },
  { label: "VERIFIED", value: "VERIFIED" },
  { label: "REJECTED", value: "REJECTED" },
]

export function ClaimsManagementTable({ claims }: ClaimsManagementTableProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    setCurrentPage(1)
  }, [search, filter])

  const filteredClaims = claims.filter((claim) => {
    const itemName = claim.item?.title || ""
    const claimerName = claim.claimer?.name || ""
    const matchesSearch = itemName.toLowerCase().includes(search.toLowerCase()) || 
                          claimerName.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filter === "ALL" || claim.status === filter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage)
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-6">
      <SearchFilterBar
        searchQuery={search}
        setSearchQuery={setSearch}
        searchPlaceholder="Search item or claimer..."
        filterOptions={FILTER_OPTIONS}
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 w-12 text-center">No</th>
                <th className="px-6 py-4">Item Details</th>
                <th className="px-6 py-4">Claimer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Submitted Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedClaims.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground">
                    No claims found.
                  </td>
                </tr>
              ) : (
                paginatedClaims.map((claim, index) => {
                  const actualIndex = (currentPage - 1) * itemsPerPage + index + 1
                  return (
                    <tr key={claim._id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-center font-medium text-muted-foreground">
                        {actualIndex}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-foreground line-clamp-1 max-w-[200px] whitespace-normal">
                          {claim.item?.title || "Deleted Item"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{claim.claimer?.name}</span>
                          <span className="text-xs text-muted-foreground">{claim.claimer?.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "uppercase font-bold text-[10px]",
                            claim.status === "PENDING" && "border-amber-200 text-amber-700 bg-amber-50",
                            claim.status === "VERIFIED" && "border-emerald-200 text-emerald-700 bg-emerald-50",
                            claim.status === "REJECTED" && "border-red-200 text-red-700 bg-red-50"
                          )}
                        >
                          {claim.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground font-medium">
                        {format(new Date(claim.createdAt), "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={`/dashboard/claims/${claim._id}`}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "font-bold",
                            claim.status === "PENDING" && "bg-slate-900 text-white hover:bg-slate-800"
                          )}
                        >
                          {claim.status === "PENDING" ? "Process" : "View"}
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <PaginationControls 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredClaims.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}