const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formatDate = require("../function/formatDate");
const Product = new Schema({
  nameProduct: {
    type: String,
    required: [true, "Name product required"],
  },
  categoryProduct: {
    type: String,
    required: [true, "Category product required"],
  },
  typeProduct: {
    type: String,
    required: [true, "Type product required"],
  },
  priceProduct: {
    type: number,
    required: [true, "Price product required"],
  },
  discountProduct: {
    type: number,
    default: null,
  },
  imageProduct: {
    type: Array,
    default: [],
  },
  rateProduct: {
    type: Array,
    default: [],
  },
  commentProduct: {
    type: Array,
    default: [],
  },
  likeProduct: {
    type: Array,
    default: [],
  },
  configProduct: {
    type: Array,
    default: [],
  },
  deleteAt:{
    type:Booolean,
    default: false
  },
  dateCreate: {
    type:Array,
    default:formatDate(Date.now())
  }
}, {
  collection: "Product",
});

module.exports = mongoose.model("Product", Product);




