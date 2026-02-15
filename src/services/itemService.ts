import connectDB from "@/lib/db";
import ItemModel from "@/models/Item";
import { ItemInput, itemSchema } from "@/lib/validators/item";
import { Types } from "mongoose";

export async function createItem(data: ItemInput, reporterId: string, imageUrls: string[] = []) {
  await connectDB();

  const validation = itemSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  const newItem = await ItemModel.create({
    ...validation.data,
    reporter: new Types.ObjectId(reporterId),
    images: imageUrls,
    status: validation.data.type === "FOUND" ? "PUBLISHED" : "PENDING"
  });

  return JSON.parse(JSON.stringify(newItem)); 
}

export async function getItems() {
  await connectDB();
  
  const items = await ItemModel.find({ status: "PUBLISHED" })
    .populate("reporter", "name") 
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(items));
}