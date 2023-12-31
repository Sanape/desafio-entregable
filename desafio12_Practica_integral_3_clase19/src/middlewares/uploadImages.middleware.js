import multer from "multer";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
  secure: true,
});

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single("image");

async function uploadImageToCloudinary(file) {
  try {
    const uploaded_image = await cloudinary.v2.uploader.upload(file, {
      resource_type: "auto",
    });

    const uploadedImageInfo = {
      public_id: uploaded_image.public_id,
      url: uploaded_image.secure_url,
    };

    return uploadedImageInfo;
  } catch (error) {
    throw error;
  }
}

async function deleteImageInCloud(publicId) {
  try {
    if (publicId === "x1vdmydenrkd3luzvjv6" || publicId === "image_not_found") {
      return null;
    }

    const deletedImage = await cloudinary.v2.uploader.destroy(publicId);

    return deletedImage;
  } catch (error) {
    throw error;
  }
}

async function processImage(req, res, next) {
  try {
    if (!req.file) {
      return next();
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");

    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const cloudInfo = await uploadImageToCloudinary(dataURI);

    req.file.publicId = cloudInfo.public_id;

    req.file.url = cloudInfo.url;

    return next();
  } catch (error) {
    next(error);
  }
}

export {
  multerUploads,
  processImage,
  deleteImageInCloud,
  uploadImageToCloudinary,
};
