/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import mongoose, { Schema, InferSchemaType } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Workspace from "./workspace.model";
import Project from "./project.model";
import Flow from "./flow.model";
import Permission from "./permission.model";

const UserSchema = new Schema(
  {
    _id: Schema.ObjectId,
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: [true, "This user name is still exist"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    password: {
      type: String,
      minlength: [4, "Please provide a password min word length {MINLENGTH}"],
      required: [true, "Please provide a password"],
      select: false,
    },
    workspaces: [{ type: Schema.Types.ObjectId, ref: "Workspace" }],
    online: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true },
);

UserSchema.methods.generateJwtFromUser = function () {
  console.log("user generate tokennn");
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  if (JWT_SECRET_KEY && JWT_EXPIRE) {
    const payload = {
      id: this._id,
      username: this.username,
      role: this.role,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRE,
    });
    return token;
  }
};
UserSchema.pre("save", function (next) {
  // Parola değişme
  if (!this.isModified("password")) {
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password || "", salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});
UserSchema.post("deleteOne", async function () {
  const userId = this.getFilter()._id;

  await Workspace.deleteMany({ createdBy: userId });
  await Project.deleteMany({ createdBy: userId });
  await Flow.deleteMany({ "config.createdBy": userId });
  await Permission.deleteMany({ userId });
});
// UserSchema.pre("deleteOne", async function (next) {
//   const userAvatar = this.getFilter().avatar;

//   const url = `${__dirname}/../../api-gateway/public/uploads/${userAvatar}`;
//   if (userAvatar) {
//     console.log("avatar:", userAvatar);
//     console.log(url);
//     await fs.unlink(url);
//     next();
//   } else next();
// });
export type User = InferSchemaType<typeof UserSchema>;
export default mongoose.model("User", UserSchema);
