import multer from "multer";
import { Request } from "express";
import ErrorClass from "../../../utils/APIError";

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, "./public/uploads");
  },
  filename(req: Request, file: Express.Multer.File, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedFileTypes.includes(file.mimetype)) {
    return cb(new ErrorClass("Please provide a valid image file", 400));
  }
  return cb(null, true);
};

export default multer({ storage, fileFilter });
