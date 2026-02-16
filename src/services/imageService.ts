import sharp from "sharp"
import cloudinary from "@/lib/cloudinary"

export async function uploadImage(fileBuffer: Buffer, folder: string = "lost-found"): Promise<string> {
  try {
    let quality = 80
    let processedBuffer = await sharp(fileBuffer)
      .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()

    while (processedBuffer.length > 200 * 1024 && quality > 20) {
      quality -= 15
      processedBuffer = await sharp(processedBuffer) 
        .webp({ quality })
        .toBuffer()
    }

    if (processedBuffer.length > 200 * 1024) {
      processedBuffer = await sharp(processedBuffer)
        .resize({ width: 800 })
        .webp({ quality: 20 })
        .toBuffer()
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "image",
          format: "webp",
          unique_filename: true,
        },
        (error, result) => {
          if (error) return reject(error)
          if (result) return resolve(result.secure_url)
          reject(new Error("Upload failed"))
        }
      )
      
      uploadStream.end(processedBuffer)
    })
  } catch (error) {
    console.error("Image Processing Error:", error)
    throw new Error("Image processing failed")
  }
}