"use server";

import { auth } from "@/auth";
import { uploadImage } from "@/services/imageService";
import { createItem } from "@/services/itemService";
import { itemSchema } from "@/lib/validators/item";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitReport(prevState: any, formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Authentication required. Please login." };
  }

  const itemType = formData.get("type") as "LOST" | "FOUND";
  const imageFile = formData.get("image") as File;
  let imageUrls: string[] = [];

  if (imageFile && imageFile.size > 0) {
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const url = await uploadImage(buffer, "lost-found-items");
      imageUrls.push(url);
    } catch (error) {
      return { error: "Image processing failed." };
    }
  } else if (itemType === "FOUND") {
    return { error: "Photo is mandatory for found items." };
  }

  try {
    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      hiddenDetails: formData.get("hiddenDetails"),
      type: itemType,
      category: formData.get("category"),
      location: formData.get("location"),
      date: formData.get("date") ? new Date(formData.get("date") as string) : new Date(),
    };

    const validatedData = itemSchema.parse({
      ...rawData,
      images: imageUrls,
    });

    await createItem(validatedData, session.user.id, imageUrls);
    
    revalidatePath("/items");
    revalidatePath("/");
    
  } catch (error: any) {
    if (error.name === "ZodError") return { error: error.errors[0].message };
    return { error: "Internal system error." };
  }

  redirect("/items"); 
}