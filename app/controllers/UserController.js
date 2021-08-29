const md5 = require("md5");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const makeId = require("../function/makeId");
const mailer = require("../utils/mailer");
class UserController {
  async informationUser(req, res) {
    try {
      const idUser = req.user._id;
      const dataUser = await UserModel.findOne({ _id: idUser });
      if (dataUser) {
        return res.status(200).json({
          status: 200,
          success: true,
          data: {
            name: dataUser.name,
            email: dataUser.email,
            notification: dataUser.notification,
            sex: dataUser.sex,
            avatar: dataUser.avatar,
            address: dataUser.address,
            cart: dataUser.cart,
            carted: dataUser.carted,
            isVerify: dataUser.isVerify,
            createDate: dataUser.createDate,
          },
          message: "Login successfully",
        });
      }
    } catch (error) {
      return res.status(200).json({
        status: 500,
        success: false,
        message: "System error, login failed",
      });
    }
  }
  async registerUser(req, res) {
    try {
      let name = req.body.name;
      let email = req.body.email;
      let password = md5(req.body.password);
      let sex = req.body.sex;
      if (sex === "Male" || sex === "Female") {
        const checkEmail = await UserModel.findOne({ email: email });
        if (!checkEmail) {
          if (password.length < 6) {
            return res.status(400).json({
              message:
                "Password is too short. Need to put more than 6 characters",
              status: 400,
              success: false,
            });
          } else {
            UserModel.create({
              name: name,
              email: email,
              password: password,
              sex: sex,
            });
            return res.status(200).json({
              message: "Account created successfully",
              status: 200,
              success: true,
            });
          }
        } else {
          res.status(400).json({
            status: 400,
            success: false,
            message: "Input data email is incorrect.This email already exists",
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: "Input data sex is incorrect",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        err: error,
        message: "Register failed because of server error",
      });
    }
  }
  async loginUser(req, res) {
    try {
      let email = req.body.email;
      let password = md5(req.body.password);
      const checkLogin = await UserModel.findOne({
        email: email,
        password: password,
      });
      if (checkLogin !== null) {
        let token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            _id: checkLogin._id,
          },
          "password"
        );
        res.header("auth-token", token);
        return res.status(200).json({
          message: "Loggin successfully",
          data: {
            name: checkLogin.name,
            email: checkLogin.email,
            token: token,
          },
          success: true,
          status: 200,
        });
      } else {
        return res.status(400).json({
          message: "Loggin failed. Account or password does not match",
          success: false,
          status: 400,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        success: false,
        status: 500,
      });
    }
  }
  async changePassword(req, res) {
    try {
      let password = req.body.password;
      let newpassword = req.body.newpassword;
      const idUser = await User.findOne({ _id: req.user });
      if (newpassword >= 6) {
        idUser.password = md5(newpassword);
        return res.status(200).json({
          message: "Password change successfully",
          success: true,
          status: 200,
        });
      } else {
        return res.status(400).json({
          message: "Password is too short. Need to put more than 6 characters",
          success: false,
          status: 400,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Sever error",
        success: false,
        status: 500,
      });
    }
  }
  async changeInformation(req, res) {
    try {
      let name = req.body.name;
      let sex = req.body.sex;
      let address = req.body.address;
      let phoneNumber = req.body.phoneNumber;
      let idUser = await UserModel.findOne({ _id: req.user });
      idUser.name = name;
      idUser.sex = sex;
      idUser.address = address;
      idUser.phoneNumber = phoneNumber;
      return res.status(200).json({
        message: "Change successfully",
        success: true,
        status: 200,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        success: false,
        status: 500,
      });
    }
  }
  async sendMailver(req, res) {
    try {
      const data = await UserModel.findOne({ _id: req.user });
      if (data.isVerify === 1) {
        res.status(400).json({
          message: "Your accoutn has been verified",
          success: false,
          status: 400,
        });
      } else {
        const generateId = makeId(6);
        data.isVerify = generateId;
        const sub = "Verify Account - Shop Store";
        const htmlContent = `<h3>Your verification code ${generateId} </h3>`;
        mailer.sendMail(data.email, sub, htmlContent);
        data.save();
        res.status(200).json({
          message: "Your email has been sent successfully",
          success: true,
          status: 200,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        success: false,
        status: 500,
      });
    }
  }
  async verifyUser(req, res) {
    try {
      let verifyToken = req.body.verifyToken;
      let data = await UserModel.findOne({ _id: req.user });
      if (data.isVerify === 1) {
        res.status(400).json({
          message: "Your account has been verified",
          success: false,
          status: 400,
        });
      } else {
        if (data.isVerify === verifyToken) {
          data.isVerify = 1;
          data.save();
          res.status(200).json({
            message: "Congratulations!!! The account has been verified",
            success: true,
            status: 200,
          });
        } else {
          res.status(400).json({
            message: "Verification code does not match",
            success: false,
            status: 400,
          });
        }
      }
    } catch (error) {}
  }
  async sendMailreset(req, res) {
    try {
      const generateId = makeId(6);
      data.isTokenreset = generateId;
      const sub = "Reset Password - Shopstore";
      const htmlContent = `<h3>Mã xác nhận của quý khách là ${generateId} </h3>`;
      mailer.sendMail(req.body.email, sub, htmlContent);
      data.save();
      res.status(200).json({
        message: "Your email has been sent successfully",
        success: true,
        status: 200,
      });
    } catch (error) {
      res.status(402).json({
        message: "Can't search email in database",
        success: false,
        status: 402,
      });
    }
  }
  async newPassword(req, res) {
    try {
      const email = req.params.email;
      const newPassword = req.body.newPassword;
      const md5newPassword = md5(newPassword);
      const verifyToken = req.body.verifyToken;
      let data = await UserModel.findOne({
        email: email,
        resetToken: verifyToken,
      });
      data.password = md5newPassword;
      data.resetToken = null;
      data.save();
      res.status(200).json({
        message: "Change password successfully",
        success: true,
        status: 200,
      });
    } catch (error) {
      res.status(402).json({
        message: "Invalid token ",
        success: false,
        status: 402,
      });
    }
  }
}

module.exports = new UserController();
