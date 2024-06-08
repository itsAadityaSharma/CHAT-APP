const UserModel = require("../models/UserModel");

async function checkEmail(request, response) {
  try {
    const { email } = request.body;
    const checkEmail = await UserModel.findOne({ email }).select("-password");
    if (!checkEmail) {
      return response
        .status(400)
        .json({ message: "User not exist", error: true });
    }

    return response
      .status(200)
      .json({ message: "User Verified", data: checkEmail });
  } catch (error) {
    response.status(500).json({ message: error });
  }
}

module.exports = checkEmail;
