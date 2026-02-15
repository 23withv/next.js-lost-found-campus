import { getItemById } from "@/services/adminService"
import { notFound } from "next/navigation"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

import { ItemDetailHeader } from "@/components/admin/item-detail-header"
import { ItemImageGallery } from "@/components/admin/item-image-gallery"
import { ItemDescriptionCard } from "@/components/admin/item-description-card"
import { ItemHiddenDetailsCard } from "@/components/admin/item-hidden-details-card"
import { ItemManagementControls } from "@/components/admin/item-management-controls"
import { ReporterInfoCard } from "@/components/admin/reporter-info-card"
import { ItemMetadataCard } from "@/components/admin/item-metadata-card"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AdminItemDetailPage({ params }: PageProps) {
  const { id } = await params
  const item = await getItemById(id)
  if (!item) notFound()

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12">
      <ItemDetailHeader item={item} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-8 space-y-6 mb-8 lg:mb-0">
          <ItemImageGallery item={item} />
          <ItemDescriptionCard description={item.description} />
          <ItemHiddenDetailsCard hiddenDetails={item.hiddenDetails} />
        </div>

        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <Card className="shadow-sm border">
            <CardHeader className="bg-muted/20 border-b">
              <CardTitle className="text-base font-semibold mb-1">Action Center</CardTitle>
              <CardDescription className="text-xs">Update the resolution status of this report.</CardDescription>
            </CardHeader>
            <CardContent className="pe-10">
              <ItemManagementControls itemId={item._id} currentStatus={item.status} />
            </CardContent>
          </Card>

          <ReporterInfoCard reporter={item.reporter} />
          <ItemMetadataCard item={item} />
        </div>
      </div>
    </div>
  )
}