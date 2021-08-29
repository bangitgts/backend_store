const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formatDate = require("../function/formatDate");
const User = new Schema(
  {
    name: {
      type: String,
      minLength: 10,
      required: [true, "fullName required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email required"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password required"],
    },
    notification: {
      type: Array,
      default: [],
    },
    sex: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default: "abc",
    },
    address: {
      type: String,
      default: ""
    },
    cart: {
      type: Array,
      default: [],
    },
    carted: {
      type: Array,
      default: [],
    },
    comment: {
      type: Array,
      default: [],
    },
    liked: {
      type: Array,
      default: [],
    },
    isVerify: {
      type: Number,
      default: 0, // 0 = chua verify, 1 = verify 
    }, //
    isResetpw: {
      type: String,
      default: null,
    },
    showLog: {
      type: Array,
      default: [],
    },
    createDate: {
      type: Object,
      default: formatDate(Date.now()),
    },
  },
  {
    collection: "User",
  }
);

module.exports = mongoose.model("User", User);
