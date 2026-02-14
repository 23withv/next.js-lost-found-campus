import { NextResponse } from "next/server";
import { createItem, getItems } from "@/services/itemService";
import UserModel from "@/models/User";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    const mockUser = await UserModel.findOne();
    if (!mockUser) return NextResponse.json({ error: "No user found" }, { status: 400 });

    // 1. Tes Validasi Gagal (Kirim data ngawur)
    try {
      await createItem({
        title: "Bad", // Terlalu pendek (min 5)
        description: "Short",
        type: "FOUND",
        category: "Others",
        location: "X",
        date: new Date(),
        hiddenDetails: "Secret"
      } as any, mockUser._id.toString());
    } catch (e: any) {
      console.log("Expected Validation Error:", e.message); // Harus muncul di console
    }

    // 2. Tes Create Sukses
    const newItem = await createItem({
      title: "Service Layer Test Item",
      description: "Testing creating item via service layer.",
      type: "LOST",
      category: "Electronics",
      location: "Server Room",
      hiddenDetails: "The serial number ends in 999",
      date: new Date(),
    }, mockUser._id.toString(), ["https://placehold.co/test.webp"]);

    // 3. Tes Get Items
    const allItems = await getItems("LOST");

    return NextResponse.json({
      success: true,
      message: "Service Layer Verified!",
      createdItem: newItem,
      itemsCount: allItems.length
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}