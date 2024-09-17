/* eslint-disable no-undef */
import bcrypt from "bcryptjs";

export const sendJwtToClient = (user, res) => {
  const token = user.generateJwtFromUser();
  const { JWT_EXPIRE, NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_EXPIRE, 10) * 1000), // ms to sn
      secure: NODE_ENV !== "development",
    })
    .json({
      access_token: token,
      data: user,
    });
};
export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
export const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  const access_token = authorization.split(" ")[1];
  return access_token;
};
