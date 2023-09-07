const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const mime = require("mime-types");

exports.uploadCloudinry = async (data) => {
  const mimeType = mime.lookup(data.originalname);
  let folderName = "image"; // Thư mục mặc định nếu không phải video hoặc hình ảnh
  if (mimeType.startsWith("video")) {
    folderName = "video";
  }
  let urlLink = null;
  if (data) {
    urlLink = await cloudinary.uploader.upload(data.path, {
      resource_type: "auto", // Tự động xác định loại tài nguyên (hình ảnh, video, ...)
      folder: folderName,
    });
  }
  fs.unlinkSync(data.path);
  return urlLink.secure_url
};
