import connectDB from "@/lib/db"
import ItemModel from "@/models/Item"
import UserModel from "@/models/User"

export async function getAllItems() {
  try {
    await connectDB()
    const items = await ItemModel.find()
      .populate("reporter", "name email image")
      .sort({ createdAt: -1 })
      .lean()
    return JSON.parse(JSON.stringify(items))
  } catch (error) {
    console.error("Get All Items Error:", error)
    return []
  }
}

export async function getItemById(id: string) {
  try {
    await connectDB()
    const item = await ItemModel.findById(id)
      .populate("reporter", "name email image phone role")
      .lean()
    if (!item) return null
    return JSON.parse(JSON.stringify(item))
  } catch (error) {
    console.error("Get Item By Id Error:", error)
    return null
  }
}

export async function getAllUsers() {
  try {
    await connectDB()
    const users = await UserModel.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean()
    return JSON.parse(JSON.stringify(users))
  } catch (error) {
    console.error("Get All Users Error:", error)
    return []
  }
}

export async function getDashboardStats() {
  try {
    await connectDB()
    const [totalItems, foundItems, lostItems, claimedItems, totalUsers] = await Promise.all([
      ItemModel.countDocuments(),
      ItemModel.countDocuments({ type: "FOUND" }),
      ItemModel.countDocuments({ type: "LOST" }),
      ItemModel.countDocuments({ status: "CLAIMED" }),
      UserModel.countDocuments({ role: "PELAPOR" }) 
    ])
    return { totalItems, foundItems, lostItems, claimedItems, totalUsers }
  } catch (error) {
    console.error("Get Dashboard Stats Error:", error)
    return { totalItems: 0, foundItems: 0, lostItems: 0, claimedItems: 0, totalUsers: 0 }
  }
}

export async function updateItemStatusInDB(id: string, status: string) {
  try {
    await connectDB()
    const updatedItem = await ItemModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean()
    return JSON.parse(JSON.stringify(updatedItem))
  } catch (error) {
    console.error("Update Item Status Error:", error)
    return null
  }
}

export async function deleteItemFromDB(id: string) {
  try {
    await connectDB()
    await ItemModel.findByIdAndDelete(id)
  } catch (error) {
    console.error("Delete Item Error:", error)
  }
}