import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) =>{
        if (file.mimetype.startsWith("image/")){
            cb(null, true);
        }else {
            cb(new Error("Only image files allowed!"), false)
        }
        
    },
    limits: { fileSize: 5 * 1024 * 1024}
});
const uploadSingle = upload.single("image")
const uploadMultiple = upload.array("images", 5)

export { uploadSingle, uploadMultiple}