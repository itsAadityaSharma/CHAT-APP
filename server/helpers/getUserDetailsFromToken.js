const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
require("dotenv").config();

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "Session out , no token",
      logout: true,
    };
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await UserModel.findById(decode.id).select("-password");
  return user;
};

module.exports = getUserDetailsFromToken;
