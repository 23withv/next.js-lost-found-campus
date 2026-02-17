"use client"

import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, User, Clock, Eye, ShieldCheck, Activity, ArrowRight } from "lucide-react"
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

interface RecentClaimsProps {
  claims: any[]
}

export function RecentClaims({ claims }: RecentClaimsProps) {
  return (
    <Card className="border shadow-sm flex flex-col h-full">
      <CardHeader className="border-b px-6 flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30">
          <Activity className="h-4 w-4 text-purple-600 dark:text-purple-500" />
        </div>
        <div>
          <CardTitle className="text-base font-bold tracking-tight">Recent Claims</CardTitle>
          <p className="text-xs text-muted-foreground font-medium">Latest verification requests.</p>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        {!claims || claims.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <ShieldAlert className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">No recent claims</p>
            <p className="text-xs text-muted-foreground mt-1">Verification requests will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full text-sm">
              <TableHeader>
                <TableRow className="bg-transparent hover:bg-transparent border-b">
                  <TableHead className="w-12 text-center font-semibold text-muted-foreground py-3">#</TableHead>
                  <TableHead className="min-w-[180px] font-semibold text-muted-foreground py-3">Item Details</TableHead>
                  <TableHead className="w-24 font-semibold text-muted-foreground py-3">Status</TableHead>
                  <TableHead className="w-12 text-right font-semibold text-muted-foreground py-3 pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim, index) => (
                  <TableRow 
                    key={claim._id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <TableCell className="text-center text-xs font-medium text-muted-foreground py-3">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground line-clamp-1 max-w-[200px]">
                          {claim.item?.title || "Deleted Item"}
                        </span>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 shrink-0" />
                            <span className="line-clamp-1 max-w-[80px]">{claim.claimer?.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>{format(new Date(claim.createdAt), "MMM d")}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "font-bold text-[10px] uppercase tracking-wider px-2 border",
                          claim.status === "PENDING" && "bg-amber-50 text-amber-700 border-amber-200",
                          claim.status === "VERIFIED" && "bg-emerald-50 text-emerald-700 border-emerald-200",
                          claim.status === "REJECTED" && "bg-red-50 text-red-700 border-red-200"
                        )}
                      >
                        {claim.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-3 pr-6">
                      <Link
                        href={`/dashboard/claims/${claim._id}`}
                        className={cn(
                          buttonVariants({ variant: claim.status === "PENDING" ? "default" : "ghost", size: "icon" }),
                          "h-8 w-8 shadow-sm",
                          claim.status !== "PENDING" && "text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50"
                        )}
                      >
                        {claim.status === "PENDING" ? <ShieldCheck className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {claims && claims.length > 0 && (
        <CardFooter className="p-0 border-t bg-muted/10">
          <Link 
            href="/dashboard/claims" 
            className="flex w-full items-center justify-center gap-2 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            View All Claims
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}