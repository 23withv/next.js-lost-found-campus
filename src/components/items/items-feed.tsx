"use client";

import { useState } from "react";
import { ItemCard } from "@/components/items/item-card";
import { SearchFilterBar } from "@/components/ui/search-filter-bar";
import { EmptyDataState } from "@/components/ui/empty-data-state";
import { PackageOpen } from "lucide-react";

interface ItemsFeedProps {
  initialItems: any[];
  currentUser: any;
}

export function ItemsFeed({ initialItems, currentUser }: ItemsFeedProps) {
  const [filter, setFilter] = useState<"ALL" | "LOST" | "FOUND">("ALL");
  const [search, setSearch] = useState("");

  const filterOptions = [
    { label: "All Items", value: "ALL" },
    { label: "Lost", value: "LOST" },
    { label: "Found", value: "FOUND" },
  ];

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
      <SearchFilterBar 
        searchQuery={search}
        setSearchQuery={setSearch}
        searchPlaceholder="Search items by name or location..."
        filterOptions={filterOptions}
        currentFilter={filter}
        onFilterChange={(val) => setFilter(val as any)}
      />

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} currentUser={currentUser} />
          ))}
        </div>
      ) : (
        <EmptyDataState 
          icon={PackageOpen}
          title="No items found"
          message={
            search ? (
              <>
                We couldn't find any matches for <strong className="text-foreground">"{search}"</strong> in the {filter !== "ALL" ? filter.toLowerCase() : "item"} category.
              </>
            ) : (
              <>
                There are currently no items in the {filter !== "ALL" ? filter.toLowerCase() : "item"} category.
              </>
            )
          }
          showClearButton={search !== "" || filter !== "ALL"}
          onClear={clearFilters}
        />
      )}
    </div>
  );
}