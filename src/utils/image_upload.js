const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: async function (req, file, next) {
        try {
            if (file.fieldname === "userProfile") {
                const storageFolder = rootDirectory+'/storage'
                const isStorageFolderExist = fs.existsSync(storageFolder);
                if(!isStorageFolderExist) fs.mkdirSync(storageFolder);
                next(null,storageFolder)
            }
        } catch(err){
            next(err)
        }
    },
    filename: function (req, file, next) {
        try {
            if (file.fieldname === "userProfile") {
                next(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        } catch(err){
            next(err)
        }    
    }
})

module.exports = multer({
    storage: storage,
    limits: { fileSize: 600000 },
    fileFilter: function (req, file, next) {
        try {
            if (file.fieldname === "userProfile") {
                const filetypes = /jpeg|jpg|png|jfif/;
                const mimetype = filetypes.test(filetypes);
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) next(null, true);
                else {
                    next({
                        status: 500,
                        message: "File upload only supports the " + filetypes
                    });
                }
            }
        } catch(err){
            next(err)
        }
    }
}).fields(
    [
        {
            name:'userProfile',
            maxCount:10
        }
    ]
)


