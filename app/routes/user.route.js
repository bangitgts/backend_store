const express = require("express");
const router = express.Router();
const checkToken = require("../auth/CheckToken");
const userController = require("../controllers/UserController")

// [GET] Information Account
router.get("/", checkToken, userController.informationAccount);

module.exports = router;