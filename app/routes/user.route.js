const express = require("express");
const router = express.Router();
const checkToken = require("../auth/CheckToken");
const userController = require("../controllers/UserController");

// [GET] Information User
router.get("/", checkToken, userController.informationUser);
// [POST] Register User
router.post("/register", userController.registerUser);
// [POST] Login User
router.post("/login", userController.loginUser);
// [PUT] Change Password user
router.put("/changepassword", userController.changePassword);
// [POST] Send Email Verification Email
router.post("/sendmailverify", checkToken, userController.sendMailver);
// [PUT] Change Information
router.put("/changeinformation", checkToken, userController.changeInformation);
// [PUT] Verification
router.put("/verifyaccount", checkToken, userController.verifyUser);
// [POST] Send Email Reset Password
router.post("/forgotpassword", userController.sendMailreset);
// [PUT] New password after reset password
router.post("/newpassword", userController.newPassword);

module.exports = router;
