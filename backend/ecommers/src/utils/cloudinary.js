const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: " dx9kem9xm",
    api_key: "359873264534757",
    api_secret: "5Dp92rWfExuO57FdTwvCuMbxK4w" // Click 'View Credentials' below to copy your API secret
});

const uploadFiles = async (localpath, foldername) => {
    const uploadResult = await cloudinary.uploader.upload(localpath, {
        folder: foldername
    }).catch((error) => { console.log(error) });

    return uploadResult
}

module.exports = uploadFiles

// dx9kem9xm