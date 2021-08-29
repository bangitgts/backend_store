const md5 = require("md5");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
class UserController {
  async informationUser(req, res) {
    try {
      const idUser = req.user._id;
      const dataUser = await UserModel.find({ _id: idUser });
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
            isVerify: dataUser.isVerify,
            isResetpw: dataUser.isResetpw,
            showLog: dataUser.showLog,
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
            return res.status(422).json({
              message:
                "Password is too short. Need to put more than 6 characters",
              status: 422,
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
          res.status(422).json({
            status: 422,
            success: false,
            message: "Input data email is incorrect.This email already exists",
          });
        }
      } else {
        res.status(422).json({
          status: 422,
          success: false,
          message: "Input data sex is incorrect",
        });
      }
    } catch (error) {}
  }
  async loginUser(req, res) {
    try {
      let email = req.body.email;
      let password = md5(req.body.password);
      const checkLogin = UserModel.findOne({
        email: email,
        password: password,
      });
      if (!checkLogin) {
        
      }
    } catch (error) {}
  }
}

module.exports = new UserController();
