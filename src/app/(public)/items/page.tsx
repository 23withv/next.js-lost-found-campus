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
    <div className="min-h-screen bg-muted/20 pb-10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-black tracking-tighter text-gray-900">
            Browse Items
          </h1>
          <p className="text-gray-500">
            View recent lost and found reports. Login to claim items.
          </p>
        </div>
        
        <ItemsFeed initialItems={items} currentUser={session?.user} />
      </div>
    </div>
  );
}