const  { cloudinary, upload, linkParser } = require('../services/cloudinary');

module.exports  = {
    create: (request,response) => {
        let parserequest = upload.single('image');
        try {
        parserequest(request, response, () => {
            if (request.file && request.file.path) {
                return response.status(200).send({"link": request.file.path});
            } else {
                return response.status(400).send({ "message": "Error in uploading image" });
            }
        });
        } catch (error) {
            console.log('error uploading image to cloudinary', error);
        }
    },
    delete: (request, response) => {
        if (request.body && request.body.image) {
            let public_id = linkParser(request.body.image)
            if (public_id) {
                cloudinary.uploader.destroy(public_id)
            }
        }
    },
}

