"use client"

import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, PackageSearch, Eye, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface RecentItemsProps {
  items: any[]
}

export function RecentItems({ items }: RecentItemsProps) {
  return (
    <Card className="border shadow-sm flex flex-col h-full">
      <CardHeader className="border-b px-6 flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30">
          <FileText className="h-4 w-4 text-blue-600 dark:text-blue-500" />
        </div>
        <div>
          <CardTitle className="text-base font-bold tracking-tight">Recent Reports</CardTitle>
          <p className="text-xs text-muted-foreground font-medium">Latest items reported by users.</p>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1">
        {!items || items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <PackageSearch className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">No recent reports</p>
            <p className="text-xs text-muted-foreground mt-1">New items will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full text-sm">
              <TableHeader>
                <TableRow className="bg-transparent hover:bg-transparent border-b">
                  <TableHead className="w-12 text-center font-semibold text-muted-foreground py-3">#</TableHead>
                  <TableHead className="min-w-[180px] font-semibold text-muted-foreground py-3">Item Details</TableHead>
                  <TableHead className="w-24 font-semibold text-muted-foreground py-3">Type</TableHead>
                  <TableHead className="w-12 text-right font-semibold text-muted-foreground py-3 pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow 
                    key={item._id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <TableCell className="text-center text-xs font-medium text-muted-foreground py-3">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground line-clamp-1 max-w-[200px]">
                          {item.title}
                        </span>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="line-clamp-1 max-w-[100px]">{item.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 shrink-0" />
                            <span>{format(new Date(item.date || item.createdAt), "MMM d")}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge 
                        variant={item.type === "FOUND" ? "found" : "lost"} 
                        className="font-bold text-[10px] uppercase tracking-wider px-2"
                      >
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-3 pr-6">
                      <Link
                        href={`/dashboard/items/${item.slug}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "h-8 w-8 shadow-sm text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50"
                        )}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      
      {items && items.length > 0 && (
        <CardFooter className="p-0 border-t bg-muted/10">
          <Link 
            href="/dashboard/items" 
            className="flex w-full items-center justify-center gap-2 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            View All Reports
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}