"use server"

import { auth } from "@/auth"
import connectDB from "@/lib/db"
import ClaimModel from "@/models/Claim"
import ItemModel from "@/models/Item"
import { claimSchema, ClaimFormValues } from "@/lib/validators/claim"
import { revalidatePath } from "next/cache"

export async function submitClaim(itemId: string, data: ClaimFormValues) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return { error: "Unauthorized access. Please log in." }
    }

    if (session.user.role !== "PELAPOR") {
      return { error: "Forbidden. Only registered users can claim items." }
    }

    const validationResult = claimSchema.safeParse(data)
    
    if (!validationResult.success) {
      return { error: "Invalid form data provided." }
    }

    await connectDB()

    const item = await ItemModel.findById(itemId)
    
    if (!item) {
      return { error: "Item not found." }
    }

    if (item.type !== "FOUND") {
      return { error: "Only found items can be claimed." }
    }

    const existingClaim = await ClaimModel.findOne({
      item: itemId,
      claimer: session.user.id,
      status: { $in: ["PENDING", "VERIFIED"] }
    })

    if (existingClaim) {
      return { error: "You have already submitted an active claim for this item." }
    }

    await ClaimModel.create({
      item: itemId,
      claimer: session.user.id,
      status: "PENDING",
      proofDescription: validationResult.data.proofDescription,
      alternateContact: validationResult.data.alternateContact || null,
    })

    revalidatePath(`/items/${item.slug}`)
    revalidatePath("/dashboard/claims")

    return { success: "Claim submitted successfully. Admin will review your proof." }
  } catch (error) {
    return { error: "An internal server error occurred while submitting the claim." }
  }
}