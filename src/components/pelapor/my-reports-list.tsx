"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { format } from "date-fns"
import { MapPin, Calendar, Eye, PackageSearch } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Item } from "@/types/frontend"
import { PaginationControls } from "@/components/ui/pagination-controls"

interface MyReportsListProps {
  reports: Item[]
}

export function MyReportsList({ reports }: MyReportsListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  if (reports.length === 0) {
    return (
      <div className="flex min-h-[500px] md:min-h-[600px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted bg-background/50 p-12 text-center animate-in fade-in-50 duration-500">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500">
          <PackageSearch className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tight mb-2">No Reports Found</h2>
        <p className="mb-8 max-w-sm text-muted-foreground font-medium">
          You haven't reported any items yet. Start reporting found or lost items now.
        </p>
        <Link 
          href="/items" 
          className={cn(
            buttonVariants({ size: "lg" }), 
            "bg-red-600 hover:bg-red-700 font-bold uppercase tracking-widest shadow-xl shadow-red-500/20"
          )}
        >
          View Public Feed
        </Link>
      </div>
    )
  }

  const totalItems = reports.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedReports = reports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden animate-in fade-in-50 duration-500">
      <div className="overflow-x-auto">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-2">
              <TableHead className="w-12 text-center font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">No</TableHead>
              <TableHead className="min-w-[150px] font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">Title</TableHead>
              <TableHead className="w-[280px] font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">Public Description</TableHead>
              <TableHead className="w-[280px] font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">Hidden Details</TableHead>
              <TableHead className="w-24 font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">Type</TableHead>
              <TableHead className="w-28 font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">Category</TableHead>
              <TableHead className="min-w-[150px] font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">Location</TableHead>
              <TableHead className="w-32 font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">Date</TableHead>
              <TableHead className="w-36 font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">Status</TableHead>
              <TableHead className="w-24 text-right font-bold uppercase tracking-widest text-[10px] text-muted-foreground py-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {paginatedReports.map((report, index) => {
              const type = report.type
              const status = report.status
              const actualIndex = (currentPage - 1) * itemsPerPage + index + 1

              const typeLabel = type === "FOUND" ? "FOUND" : "LOST"
              const typeVariant = type === "FOUND" ? "found" : "lost"

              let statusLabel = "PENDING"
              let statusVariant: "default" | "secondary" | "success" | "outline" = "secondary"

              if (status === "PUBLISHED") {
                statusLabel = "PUBLISHED"
                statusVariant = "outline"
              } else if (status === "CLAIMED") {
                statusLabel = "CLAIMED"
                statusVariant = "default"
              }

              return (
                <TableRow 
                  key={report._id}
                  className="hover:bg-muted/40 transition-colors group border-b last:border-0 align-top"
                >
                  <TableCell className="text-center font-medium text-muted-foreground py-5">
                    {actualIndex}
                  </TableCell>
                  <TableCell className="font-bold text-foreground py-5">
                    <span className="line-clamp-2">{report.title}</span>
                  </TableCell>
                  <TableCell className="py-5">
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 whitespace-normal break-words max-w-[280px]">
                      {report.description}
                    </p>
                  </TableCell>
                  <TableCell className="py-5">
                    <p className="text-muted-foreground italic text-xs leading-relaxed line-clamp-3 whitespace-normal break-words max-w-[280px]">
                      {report.hiddenDetails || "-"}
                    </p>
                  </TableCell>
                  <TableCell className="py-5">
                    <Badge 
                      variant={typeVariant}
                      className="font-black uppercase tracking-widest text-[9px] px-2.5 py-0.5"
                    >
                      {typeLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize font-medium text-xs text-muted-foreground py-5">
                    {report.category}
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 mt-0.5">
                        <MapPin className="h-3 w-3 text-red-600" />
                      </div>
                      <span className="text-xs font-semibold text-foreground line-clamp-2 whitespace-normal max-w-[130px]">
                        {report.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50">
                        <Calendar className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                        {format(new Date(report.date || report.createdAt), "dd MMM yyyy")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <Badge 
                      variant={statusVariant as any}
                      className={cn(
                        "text-[9px] font-black uppercase tracking-widest border px-2.5 py-1 text-center leading-tight whitespace-normal break-words w-full justify-center max-w-[120px]",
                        status === "CLAIMED" && "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200"
                      )}
                    >
                      {statusLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-5">
                    <Link
                      href={`/items/${report.slug}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "font-bold text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors h-8 whitespace-nowrap"
                      )}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}