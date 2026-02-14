"use client";

import { useState } from "react";
import { ItemCard } from "@/components/items/item-card";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex p-1 bg-muted rounded-lg w-full md:w-auto">
          {["ALL", "LOST", "FOUND"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`flex-1 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                filter === type
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type === "ALL" ? "All Items" : type === "LOST" ? "Lost" : "Found"}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9"
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
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <div className="bg-muted p-4 rounded-full mb-4">
            <Filter className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold">No items found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}