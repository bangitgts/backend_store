const express = require("express");
const router = express.Router();
const checkToken = require("../auth/CheckToken");
const userController = require("../controllers/UserController")

// [GET] Information Account
router.get("/", checkToken, userController.informationUser);
// [POST] Register Account
router.post('/register', userController.registerUser);
// [POST] Login Account
router.post('/login', userController.loginUser);
// [POST] Change Password Account
router.put('/changepassword', userController.changePassword);


module.exports = router;