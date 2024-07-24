const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  filefilter: (req, file, cb) => {
    console.log(file);
    const ext = path.extname(file.originalname);

    if (ext !== ".jpg" && ext !== '.png' && ext !== '.jpeg') {
      return cb(new Error("Formato incorrecto"), false);
    }

    cb(null, true);
    
  },
});
