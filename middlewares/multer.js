const multer = require('multer');
const path = require('path');
const fs = require('fs');

const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = 'public/images';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  }
  cb('Error: Images Only !!!');
}

const uploadSingle = multer({
  storage: diskStorage,
  limits: { fileSize: 300 * 1024 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

module.exports = {
  uploadSingle,
};
