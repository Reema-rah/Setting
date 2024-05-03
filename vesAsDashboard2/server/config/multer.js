const multer = require('multer');
var path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Change 'uploads/' to your desired directory
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
});
const upload = multer({ storage });

module.exports = upload;