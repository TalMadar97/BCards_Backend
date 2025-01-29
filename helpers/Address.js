const { mongoose } = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Address = new mongoose.Schema({
  state: {
    type: String,
    maxLength: 256,
    trim: true,
  },
  country: DEFAULT_VALIDATION,
  city: DEFAULT_VALIDATION,
  street: DEFAULT_VALIDATION,
  houseNumber: {
    type: String,
    required: true,
    min: 1,
  },
  zip: {
    type: String,
    default: 0,
  },
});

module.exports = Address;
