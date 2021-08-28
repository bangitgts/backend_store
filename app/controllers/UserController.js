const md5 = require("md5");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
class UserController {
  async informationAccount(req, res) {
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
}

module.exports = new UserController();
