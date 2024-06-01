const express = require("express");
const registerUser = require("../Controller/registerUser");
const checkMail = require("../Controller/checkEmail");
const checkPassword = require("../Controller/checkPassword");

const router = express.Router();

router.post("/register", registerUser);
router.post("/email", checkMail);
router.post("/password", checkPassword);

module.exports = router;
