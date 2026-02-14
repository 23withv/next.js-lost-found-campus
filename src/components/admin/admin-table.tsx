"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Package, MapPin, User, Calendar } from "lucide-react";

interface AdminTableProps {
  items: any[];
}

export function AdminTable({ items }: AdminTableProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-75">Item Details</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Reporter</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-900 dark:text-slate-100 font-bold">{item.title}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Package className="size-3" /> {item.category}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={item.type === "LOST" ? "destructive" : "default"}
                  className={item.type === "FOUND" ? "bg-emerald-500 hover:bg-emerald-600 border-none" : ""}
                >
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-3 text-slate-400" />
                  {item.location}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm flex items-center gap-1">
                    <User className="size-3 text-slate-400" /> {item.reporter?.name || "Anonymous"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{item.reporter?.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm flex items-center gap-1 text-slate-500">
                  <Calendar className="size-3" /> {format(new Date(item.date), "MMM dd, yyyy")}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="outline" className="capitalize">
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}