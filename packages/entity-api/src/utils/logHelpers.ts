import path from "path";
import fs, { WriteStream } from "fs";

// eslint-disable-next-line import/prefer-default-export
export const accessLogStream: WriteStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" },
);
