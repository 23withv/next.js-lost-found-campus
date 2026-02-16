import { getItemBySlug } from "@/services/itemService"
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { ItemDetail } from "@/components/items/item-detail"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PublicItemDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const item = await getItemBySlug(resolvedParams.slug)
  const session = await auth()

  if (!item) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <ItemDetail item={item} currentUser={session?.user} />
    </div>
  )
}