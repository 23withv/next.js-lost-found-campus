"use server"

import { auth } from "@/auth"
import { updateItemStatusInDB, deleteItemFromDB } from "@/services/adminService"
import ClaimModel from "@/models/Claim"
import ItemModel from "@/models/Item"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function changeItemStatus(id: string, status: string) {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized access" }
  }

  try {
    const updatedItem = await updateItemStatusInDB(id, status)
    if (updatedItem && updatedItem.slug) {
      revalidatePath(`/dashboard/items/${updatedItem.slug}`)
      revalidatePath(`/items/${updatedItem.slug}`) 
    }
    
    revalidatePath("/dashboard/items")
    return { success: "Status updated successfully" }
  } catch (error) {
    return { error: "Failed to update status" }
  }
}

export async function deleteItem(id: string) {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized access" }
  }

  try {
    await deleteItemFromDB(id)
    revalidatePath("/dashboard/items")
    revalidatePath("/items")
  } catch (error) {
    return { error: "Failed to delete item" }
  }

  redirect("/dashboard/items")
}

export async function processClaimValidation(claimId: string, status: "VERIFIED" | "REJECTED", feedback: string) {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized access" }
  }

  try {
    const claim = await ClaimModel.findById(claimId)
    if (!claim) return { error: "Claim not found" }

    claim.status = status
    claim.adminFeedback = feedback
    claim.resolvedAt = new Date()
    await claim.save()

    if (status === "VERIFIED") {
      const item = await ItemModel.findById(claim.item)
      if (item) {
        item.status = "CLAIMED"
        await item.save()
        revalidatePath(`/items/${item.slug}`)
      }
      
      await ClaimModel.updateMany(
        { item: claim.item, _id: { $ne: claimId }, status: "PENDING" },
        { 
          status: "REJECTED", 
          adminFeedback: "Item has been successfully claimed by another user.", 
          resolvedAt: new Date() 
        }
      )
    }

    revalidatePath("/dashboard/claims")
    revalidatePath(`/dashboard/claims/${claimId}`)
    return { success: `Claim successfully ${status.toLowerCase()}` }
  } catch (error) {
    return { error: "Failed to process claim" }
  }
}