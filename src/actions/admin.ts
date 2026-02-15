"use server"

import { auth } from "@/auth"
import { updateItemStatusInDB, deleteItemFromDB } from "@/services/adminService"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function changeItemStatus(id: string, status: string) {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized access" }
  }

  try {
    await updateItemStatusInDB(id, status)
    revalidatePath(`/dashboard/items/${id}`)
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
  } catch (error) {
    return { error: "Failed to delete item" }
  }

  redirect("/dashboard/items")
}