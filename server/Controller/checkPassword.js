const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

const jwt = require("jsonwebtoken");
async function checkPassword(request, response) {
  try {
    const { password, userId } = request.body;
    const user = await UserModel.findById(userId);

    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return response
        .status(400)
        .json({ message: "Please check passowrd", error: true });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      http: true,
      secure: true,
    };

    return response
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({ message: "Login Successful", success: true });
  } catch (err) {
    response.status(500).json({ message: err, error: true });
  }
}

module.exports = checkPassword;
