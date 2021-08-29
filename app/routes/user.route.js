const express = require("express");
const router = express.Router();
const checkToken = require("../auth/CheckToken");
const userController = require("../controllers/UserController")

// [GET] Information Account
router.get("/", checkToken, userController.informationUser);
// [POST] Register Account
router.post('/register', userController.registerUser);
// [Login] Login Account
router.post('/login', userController.loginUser);
module.exports = router;