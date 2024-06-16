const UserModel = require("../models/UserModel");

async function searchUser(req, res) {
  const { search } = req.params;
  try {
    let users = [];

    users = await UserModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
  }
}

module.exports = searchUser;
