const mongoose = require("mongoose");
const Name = require("../helpers/Name");
const { PHONE, EMAIL } = require("../helpers/mongooseValidators");
const Image = require("../helpers/Image");
const Address = require("../helpers/Address");

const userSchema = new mongoose.Schema({
  name: Name,
  phone: PHONE,
  email: EMAIL,
  password: { type: String, require: true, trim: true },
  image: Image,
  address: Address,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
