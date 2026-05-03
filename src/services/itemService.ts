import connectDB from "@/lib/db";
import ItemModel from "@/models/Item";
import { ItemInput, itemSchema } from "@/lib/validators/itemSchema";
import { Types } from "mongoose";
import slugify from "slugify";

export async function createItem(
  data: ItemInput,
  reporterId: string,
  imageUrls: string[] = [],
) {
  
  const validation = itemSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  const generatedSlug =
    slugify(validation.data.title, {
      lower: true,
      strict: true,
    }) +
    "-" +
    Math.random().toString(36).substring(2, 7);

  await connectDB();
  const newItem = await ItemModel.create({
    ...validation.data,
    slug: generatedSlug,
    reporter: new Types.ObjectId(reporterId),
    images: imageUrls,
    status: "PUBLISHED",
  });

  return JSON.parse(JSON.stringify(newItem));
}

export async function getItems() {
  await connectDB();

  const items = await ItemModel.find({ status: "PUBLISHED" })
    .populate("reporter", "name")
    .sort({ createdAt: -1 })
    .lean()
    .select("");

  return JSON.parse(JSON.stringify(items));
}

export async function getReportsByUserId(userId: string) {
  await connectDB();

  const items = await ItemModel.find({ reporter: new Types.ObjectId(userId) })
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(items));
}

export async function getItemBySlug(slug: string) {
  await connectDB();
  const item = await ItemModel.findOne({ slug })
    .populate("reporter", "name image")
    .lean();

  return JSON.parse(JSON.stringify(item));
}
