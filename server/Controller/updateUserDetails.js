const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(req, res) {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      return res.status(200).json({
        message: "You are logged out",
      });
    }
    const user = await getUserDetailsFromToken(token);
    const { name, profile_pic } = req.body;
    const updateUser = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        name,
        profile_pic,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "User Updated",
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = updateUserDetails;
