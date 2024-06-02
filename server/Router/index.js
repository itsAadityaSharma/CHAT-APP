const express = require("express");
const registerUser = require("../Controller/registerUser");
const checkMail = require("../Controller/checkEmail");
const checkPassword = require("../Controller/checkPassword");
const userDetails = require("../Controller/userDetail");
const logout = require("../Controller/logout");
const updateUserDetails = require("../Controller/updateUserDetails");

const router = express.Router();

//register user API
router.post("/register", registerUser);
//check email API
router.post("/email", checkMail);
// check password API
router.post("/password", checkPassword);
// login user details API
router.get("/userDetails", userDetails);
// logout user details API
router.get("/logout", logout);
// update User
router.patch("/updateUser", updateUserDetails);

module.exports = router;
