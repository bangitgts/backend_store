const md5 = require("md5");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
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
      if (checkLogin) {
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
      }
    } catch (error) {
      return res.status(400).json({
        message: "Loggin failed. Account or password does not match",
        success: false,
        status: 400,
      });
    }
  }
}

module.exports = new UserController();
