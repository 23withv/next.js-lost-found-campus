// app/items/page.tsx
import { getItems } from "@/services/itemService";
import { auth } from "@/auth";
import { ItemsFeed } from "@/components/items/items-feed";

export const dynamic = "force-dynamic";

export default async function ItemsPage() {
  const [items, session] = await Promise.all([getItems(), auth()]);

  return (
    <div className="pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="space-y-2 border-l-4 border-red-600 pl-4 max-w-xl">
            <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">
              Browse Items
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore reports from across the campus. Authenticate to interact with items.
            </p>
          </div>
          <div className="w-full lg:w-auto lg:min-w-[320px] xl:min-w-95"></div>
        </div>

        <ItemsFeed initialItems={items} currentUser={session?.user} />
      </div>
    </div>
  );
}