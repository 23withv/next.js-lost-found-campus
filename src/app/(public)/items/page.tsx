import { getItems } from "@/services/itemService";
import { auth } from "@/auth";
import { ItemsFeed } from "@/components/items/items-feed";

export const dynamic = "force-dynamic"; 

export default async function ItemsPage() {
  const [items, session] = await Promise.all([
    getItems(),
    auth()
  ]);

  return (
    <div className="pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-20 space-y-2 border-l-4 border-red-600 pl-4">
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">
            Browse Items
          </h1>
          <p className="text-muted-foreground">
            Explore reports from across the campus. Authenticate to interact with items.
          </p>
        </div>
        
        <ItemsFeed initialItems={items} currentUser={session?.user} />
      </div>
    </div>
  );
}