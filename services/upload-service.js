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

  async uploadImage(fileBuffer, userId, type) {
    return new Promise((resolve, reject) => {
      if (!fileBuffer || fileBuffer.length === 0) {
        console.error("UploadService Error: fileBuffer is missing or empty");
        return reject(new Error("No file buffer provided"));
      }

      let folder = "users"
      let publicId = "";
      const timestamp = Date.now();

      if(type === "profile"){
        folder = "users/profile_picture",
        publicId = `${folder}/${userId}`;
      }
      else{
        folder = "users/posts",
        publicId = `${folder}/${userId}_${timestamp}`;
      }

      const uploadStream = this.cloudinary.uploader.upload_stream(
        { folder, public_id: publicId, overwrite: true ? type === "profile" : type === "post" }, 
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result.secure_url);
        }
      );

      this.bufferToStream(fileBuffer).pipe(uploadStream);
    });
  }
}

export default new UploadService();
