const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage }  = require("multer-storage-cloudinary");
const config = require('../../../shared/config');

cloudinary.config({
    cloud_name: config.get('CLOUDINARY_NAME'),
    api_key: config.get('CLOUDINARY_API_KEY'),
    api_secret: config.get('CLOUDINARY_API_SECRET')
});

exports.cloudinary = cloudinary;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: config.get('CLOUDINARY_FOLDER')
    }
});

exports.upload = multer({ storage: storage });

exports.linkParser = (link) => {
    let sliced = link.slice(link.indexOf(config.get('CLOUDINARY_FOLDER')+'/'))
    let lastIndex = sliced.lastIndexOf('.')
    return sliced.slice(0, lastIndex !== -1 ? lastIndex : sliced.length)
}

