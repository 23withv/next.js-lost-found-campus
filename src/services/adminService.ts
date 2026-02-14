import connectDB from "@/lib/db";
import ItemModel from "@/models/Item";
import UserModel from "@/models/User";

export async function getAllItems() {
  await connectDB();
  const items = await ItemModel.find()
    .populate("reporter", "name email image") 
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(items));
}

export async function getAllUsers() {
  await connectDB();
  const users = await UserModel.find()
    .select("-password") 
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(users));
}

export async function getDashboardStats() {
    await connectDB();
    
    const [totalItems, foundItems, lostItems, totalUsers] = await Promise.all([
        ItemModel.countDocuments(),
        ItemModel.countDocuments({ type: "FOUND" }),
        ItemModel.countDocuments({ type: "LOST" }),
        UserModel.countDocuments({ role: "USER" })
    ]);

    return { totalItems, foundItems, lostItems, totalUsers };
}