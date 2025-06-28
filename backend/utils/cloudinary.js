// backend/utils/cloudinary.js (Correct Final Version)

import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: 'backend/config/config.env' });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// This is a NAMED EXPORT. The function name `upload_file` is exported directly.
export const upload_file = async (file, folder) => {
    const result = await cloudinary.v2.uploader.upload(file, {
        folder,
        resource_type: 'auto',
    });

    return {
        public_id: result.public_id,
        url: result.secure_url,
    };
};

// This is also a NAMED EXPORT.
export const delete_file = async (file_public_id) => {
    await cloudinary.v2.uploader.destroy(file_public_id);
};