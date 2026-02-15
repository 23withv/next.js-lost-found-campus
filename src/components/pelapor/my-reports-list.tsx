"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MyReportsListProps {
  reports: any[];
}

export function MyReportsList({ reports }: MyReportsListProps) {
  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl">
        <p className="text-muted-foreground">You haven't submitted any reports yet.</p>
        <Link 
          href="/items" 
          className="mt-4 text-sm font-bold text-red-600 hover:underline"
        >
          Browse public feed
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white dark:bg-slate-950 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="font-bold">Item</TableHead>
            <TableHead className="font-bold">Type</TableHead>
            <TableHead className="font-bold">Location</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Date Reported</TableHead>
            <TableHead className="text-right font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report._id} className="group">
              <TableCell>
                <span className="font-semibold text-foreground line-clamp-1">
                  {report.title}
                </span>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "font-bold uppercase text-[10px]",
                    report.type === "FOUND" 
                      ? "border-emerald-200 text-emerald-700 bg-emerald-50" 
                      : "border-blue-200 text-blue-700 bg-blue-50"
                  )}
                >
                  {report.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs truncate max-w-[150px]">{report.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  className={cn(
                    "text-[10px] font-bold",
                    report.status === "PUBLISHED" && "bg-emerald-500",
                    report.status === "PENDING" && "bg-amber-500",
                    report.status === "CLAIMED" && "bg-slate-700"
                  )}
                >
                  {report.status}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(report.createdAt), "MMM dd, yyyy")}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/items/${report._id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  View <ExternalLink className="h-3 w-3" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}