const express = require("express");
const router = express.Router();
const checkToken = require("../auth/CheckToken");
const userController = require("../controllers/UserController")

// [GET] Information Account
router.get("/", checkToken, userController.informationUser);
// [POST] Register Account
router.get('/register', userController.registerUser);
module.exports = router;