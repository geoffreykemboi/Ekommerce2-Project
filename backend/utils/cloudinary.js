import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload_file = async (file, folder) => {
  const result = await cloudinary.v2.uploader.upload(file, {
    folder,
    resource_type: "auto",
  });

  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};

export const delete_file = async (file_public_id) => {
  await cloudinary.v2.uploader.destroy(file_public_id);
};