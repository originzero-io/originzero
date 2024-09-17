import User from "../database/models/User.js";
import ErrorClass from "../utils/ErrorClass.js";
import { comparePassword } from "./helpers/authHelpers.js";

class AuthRepository {
  static async login(credentials) {
    const { username, password } = credentials;
    const userWithoutPassword = await User.findOne({ username });
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      throw new ErrorClass("User not found", 400);
    } else if (!comparePassword(password, user.password)) {
      throw new ErrorClass("Please check your info", 400);
    } else {
      return userWithoutPassword;
    }
  }

  static async register(person) {
    const user = await User.create(person);
    return user;
  }

  static async me(userId) {
    const user = await User.findById(userId).select("+password");
    return user;
  }
}

export default AuthRepository;
