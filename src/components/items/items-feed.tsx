"use client";

import { useState } from "react";
import { ItemCard } from "@/components/items/item-card";
import { Search, PackageOpen, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ItemsFeedProps {
  initialItems: any[];
  currentUser: any;
}

export function ItemsFeed({ initialItems, currentUser }: ItemsFeedProps) {
  const [filter, setFilter] = useState<"ALL" | "LOST" | "FOUND">("ALL");
  const [search, setSearch] = useState("");

  const filteredItems = initialItems.filter((item) => {
    const matchesType = filter === "ALL" || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.location.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const clearFilters = () => {
    setSearch("");
    setFilter("ALL");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border shadow-sm dark:bg-slate-950">
        <div className="flex p-1 bg-muted rounded-lg w-full md:w-auto">
          {["ALL", "LOST", "FOUND"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`flex-1 px-6 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                filter === type
                  ? "bg-background text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              {type === "ALL" ? "All Items" : type === "LOST" ? "Lost" : "Found"}
            </button>
          ))}
        </div>

        <div className="relative flex items-center w-full md:w-80 h-10">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70 pointer-events-none z-10" />
          <Input
            placeholder="Search items by name or location..."
            className="pl-11 h-full border-0 bg-muted/40 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-red-500 w-full transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} currentUser={currentUser} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-112.5 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted bg-white/50 dark:bg-slate-950/50 pt-12 pb-20 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full dark:bg-red-950/30">
            <PackageOpen className="h-12 w-12 text-red-500 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">No items found</h3>
          
          <p className="mt-3 text-muted-foreground max-w-md text-lg">
            {search ? (
              <>
                We couldn't find any matches for <strong className="text-foreground">"{search}"</strong> in the {filter !== "ALL" ? filter.toLowerCase() : "item"} category.
              </>
            ) : (
              <>
                There are currently no items in the {filter !== "ALL" ? filter.toLowerCase() : "item"} category.
              </>
            )}
          </p>
          
          {(search !== "" || filter !== "ALL") && (
            <button 
              onClick={clearFilters}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }), 
                "mt-10 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors font-semibold shadow-sm"
              )}
            >
              <XCircle className="mr-2 h-5 w-5" />
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}