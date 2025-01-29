const bcrypt = require("bcrypt");
const User = require("../models/User");

async function create(user) {
  //Hash the Password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  //Create and save the new user
  const newUser = new User({
    name: user.name,
    phone: user.phone,
    email: user.email,
    password: hashedPassword,
    image: user.image,
    address: user.address,
    isAdmin: user.isAdmin || false,
    isBusiness: user.isBusiness || false,
  });

  return await newUser.save();
}

//Check if user already exist
async function isExist(email) {
  const user = await User.findOne({ email });
  return user ? true : false;
}

module.exports = { create, isExist };
