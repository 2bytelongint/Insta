import cloudinary from "../config/cloudinaryConfig.js";
import { Readable } from "stream";

class UploadService {
  constructor() {
    this.cloudinary = cloudinary;
  }

  bufferToStream(buffer) {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    return readable;
  }

  async uploadImage(fileBuffer, userId, folder = "users/profile") {
    return new Promise((resolve, reject) => {
      if (!fileBuffer || fileBuffer.length === 0) {
        console.error("❌ UploadService Error: fileBuffer is missing or empty");
        return reject(new Error("No file buffer provided"));
      }

      const timestamp = Date.now();
      const publicId = `${folder}/${userId}_${timestamp}`;

      console.log(`📤 Uploading image for User: ${userId} -> ${publicId}`);

      const uploadStream = this.cloudinary.uploader.upload_stream(
        { folder, public_id: `${userId}_${timestamp}` }, // Naming convention
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary Upload Error:", error.message);
            return reject(error);
          }
          console.log("✅ Cloudinary Upload Success:", result.secure_url);
          resolve(result.secure_url);
        }
      );

      this.bufferToStream(fileBuffer).pipe(uploadStream);
    });
  }
}

export default new UploadService();
