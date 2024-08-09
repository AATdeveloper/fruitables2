const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "dggzpcl2s",
    api_key: process.env.CLOUDINARY_API_KEY_URL,
    api_secret: process.env.CLOUDINARY_API_SECRET_URL // Click 'View Credentials' below to copy your API secret
});

const uploadFiles = async (localpath, foldername) => {
    const uploadResult = await cloudinary.uploader.upload(localpath, {
        folder: foldername
    }).catch((error) => { console.log(error) });

    return uploadResult
}

module.exports = uploadFiles

// dx9kem9xm