import { NextResponse } from "next/server";
import { createItem, getItems } from "@/services/itemService"; // Kita pakai Service, bukan Model langsung
import UserModel from "@/models/User";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    
    // 1. Ambil User Sembarang (Pelapor)
    const mockUser = await UserModel.findOne();
    if (!mockUser) return NextResponse.json({ error: "No user found" }, { status: 400 });

    console.log("--- MULAI TEST SERVICE ---");

    // 2. TES VALIDASI ERROR (Sengaja kita bikin salah)
    // Zod harusnya teriak di console terminal karena Title kependekan & Type ngawur
    console.log("1. Testing Invalid Data...");
    try {
      await createItem({
        title: "Bad",       // Error: Min 5 chars
        description: "Short",
        type: "NGAWUR",     // Error: Invalid Enum
        category: "Others",
        location: "X",
        date: new Date(),
        hiddenDetails: "Secret"
      } as any, mockUser._id.toString());
    } catch (e: any) {
      console.log("✅ SUKSES: Validasi Zod Berjalan! Error:", e.message); 
    }

    // 3. TES CREATE SUKSES (Data Benar)
    console.log("2. Testing Valid Data...");
    const newItem = await createItem({
      title: "HP iPhone 15 Pro",
      description: "Kehilangan HP di kantin teknik, casing warna hitam.",
      type: "LOST",
      category: "Electronics",
      location: "Kantin Teknik",
      hiddenDetails: "Wallpaper layar kunci foto kucing oren.",
      date: new Date(),
    }, mockUser._id.toString(), ["https://placehold.co/test.webp"]);

    // 4. TES GET ITEMS
    console.log("3. Testing Get Items...");
    const allItems = await getItems("LOST");

    return NextResponse.json({
      success: true,
      message: "Service Layer & Zod Verified!",
      testResult: "Cek Terminal VS Code Anda untuk melihat log validasi error.",
      newItem: newItem,
      totalLostItems: allItems.length
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}