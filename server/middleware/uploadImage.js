import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || extension == '.jpg' || extension == '.jpeg' || extension == '.png') {
            callback(null, true);
        }
        else {
            console.log('Only png or jpg files are supported!');
            callback(null, false);
        }
    }
})

export default upload;