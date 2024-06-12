const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function userDetails(req, res) {
  try {
    const token = req.body.token || "";
    const userDetails = await getUserDetailsFromToken(token);
    res
      .status(200)
      .json({ message: "User Details", data: userDetails, success: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
}

module.exports = userDetails;
