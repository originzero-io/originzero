/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
import multer from "multer";
import path from "path";
import ErrorClass from "../../utils/ErrorClass.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = req.body.username + "-avatar" + path.extname(file.originalname);
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedFileTypes.includes(file.mimetype)) {
    return cb(new ErrorClass("Please provide a valid image file", 400), false);
  }
  return cb(null, true);
};

export default multer({ storage, fileFilter });
