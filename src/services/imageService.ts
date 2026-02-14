import sharp from "sharp";
import cloudinary from "@/lib/cloudinary";

export async function uploadImage(fileBuffer: Buffer, folder: string = "lost-found"): Promise<string> {
  try {
    const processedBuffer = await sharp(fileBuffer)
      .resize({ width: 1200, height: 1200, fit: "inside" }) 
      .webp({ quality: 80 }) 
      .toBuffer();

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "image",
          format: "webp", 
        },
        (error, result) => {
          if (error) return reject(error);
          if (result) return resolve(result.secure_url);
          reject(new Error("Upload failed"));
        }
      );
      
      uploadStream.end(processedBuffer);
    });
  } catch (error) {
    console.error("Image Upload Error:", error);
    throw new Error("Failed to process and upload image");
  }
}