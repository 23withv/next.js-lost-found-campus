"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ClaimsManagementTableProps {
  claims: any[]
}

export function ClaimsManagementTable({ claims }: ClaimsManagementTableProps) {
  const [search, setSearch] = useState("")

  const filteredClaims = claims.filter((claim) => {
    const itemName = claim.item?.title || ""
    const claimerName = claim.claimer?.name || ""
    return itemName.toLowerCase().includes(search.toLowerCase()) || 
           claimerName.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-end">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search item or claimer..."
            className="h-10 border-0 bg-muted/50 pl-9"
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
                <th className="px-6 py-4">Claimer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Submitted Date</th>
                <th className="px-6 py-4 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-muted-foreground">No claims found.</td>
                </tr>
              ) : filteredClaims.map((claim) => (
                <tr key={claim._id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-foreground line-clamp-1">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}