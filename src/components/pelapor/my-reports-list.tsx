"use client"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { format } from "date-fns"
import { MapPin, Calendar, ExternalLink, PackageSearch } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MyReportsListProps {
  reports: any[]
}

export function MyReportsList({ reports }: MyReportsListProps) {
  if (reports.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted bg-muted/10 p-8 text-center animate-in fade-in-50 duration-500">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/20">
          <PackageSearch className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          No Reports Found
        </h2>
        <p className="mb-8 max-w-md text-muted-foreground">
          You haven't submitted any lost or found reports yet. Help the community by reporting items you find or listing items you've lost.
        </p>
        <Link 
          href="/items" 
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "bg-red-600 text-white hover:bg-red-700 font-bold shadow-sm"
          )}
        >
          Browse Public Feed
        </Link>
      </div>
    )
  }

return (
    <div className="w-full rounded-xl border bg-card shadow-sm overflow-hidden animate-in fade-in-50 duration-500">
      <div className="w-full overflow-x-auto">
        <Table className="w-full min-w-[1000px] text-sm">
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[35%] px-6 py-4 font-bold text-foreground">Item Details</TableHead>
              <TableHead className="w-[10%] px-6 py-4 font-bold text-foreground">Type</TableHead>
              <TableHead className="w-[20%] px-6 py-4 font-bold text-foreground">Location</TableHead>
              <TableHead className="w-[15%] px-6 py-4 font-bold text-foreground">Status</TableHead>
              <TableHead className="w-[15%] px-6 py-4 font-bold text-foreground">Date Reported</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {reports.map((report) => {
              const reportType = (report.type || "").toLowerCase() as "found" | "lost"
              const reportStatus = (report.status || "").toLowerCase() as "published" | "claimed" | "pending"

              return (
                <TableRow key={report._id} className="group hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6 py-5">
                    <span className="font-bold text-foreground line-clamp-2 pr-4">
                      {report.title}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <Badge
                      variant={reportType}
                      className="font-bold uppercase tracking-wider text-[10px] px-2.5 py-1"
                    >
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                        <MapPin className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-sm font-medium line-clamp-2">
                        {report.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <Badge variant={reportStatus as any} className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold shadow-sm">
                      {report.status}
                    </Badge>                  
                  </TableCell>
                  <TableCell className="px-6 py-5 text-sm text-muted-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      </div>
                      {format(new Date(report.createdAt), "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}