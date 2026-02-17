"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { PaginationControls } from "@/components/ui/pagination-controls"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"

interface UsersManagementTableProps {
  users: any[]
}

const FILTER_OPTIONS = [
  { label: "ALL ROLES", value: "ALL" },
  { label: "ADMIN", value: "ADMIN" },
  { label: "PELAPOR", value: "PELAPOR" },
]

export function UsersManagementTable({ users }: UsersManagementTableProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      (user.name || "").toLowerCase().includes(search.toLowerCase()) || 
      (user.email || "").toLowerCase().includes(search.toLowerCase())
    
    const matchesRole = filter === "ALL" || user.role === filter
    
    return matchesSearch && matchesRole
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-6">
      <SearchFilterBar
        searchQuery={search}
        setSearchQuery={(val) => {
          setSearch(val)
          setCurrentPage(1)
        }}
        searchPlaceholder="Search by name or email..."
        filterOptions={FILTER_OPTIONS}
        currentFilter={filter}
        onFilterChange={(val) => {
          setFilter(val)
          setCurrentPage(1)
        }}
      />

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 w-12 text-center">No</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-muted-foreground">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => {
                  const actualIndex = (currentPage - 1) * itemsPerPage + index + 1
                  return (
                    <tr key={user._id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-center font-medium text-muted-foreground">
                        {actualIndex}
                      </td>
                      <td className="px-6 py-4 font-bold text-foreground">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant={user.role === "ADMIN" ? "default" : "secondary"}
                          className="uppercase font-bold tracking-widest text-[10px]"
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground font-medium">
                        {format(new Date(user.createdAt), "MMM dd, yyyy")}
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
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}