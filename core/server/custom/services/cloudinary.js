const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage }  = require("multer-storage-cloudinary");
const config = require('../../../shared/config');

cloudinary.config({
    cloud_name: config.get('storage:ghost-storage-cloudinary:auth:cloud_name'),
    api_key: config.get('storage:ghost-storage-cloudinary:auth:api_key'),
    api_secret: config.get('storage:ghost-storage-cloudinary:auth:api_secret')
});

exports.cloudinary = cloudinary;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: config.get('storage:ghost-storage-cloudinary:upload:folder')
    }
});

exports.upload = multer({ storage: storage });

exports.linkParser = (link) => {
    let sliced = link.slice(link.indexOf(config.get('storage:ghost-storage-cloudinary:upload:folder')+'/'))
    let lastIndex = sliced.lastIndexOf('.')
    return sliced.slice(0, lastIndex !== -1 ? lastIndex : sliced.length)
}

