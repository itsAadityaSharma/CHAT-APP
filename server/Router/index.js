const express = require("express");
const registerUser = require("../Controller/registerUser");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
