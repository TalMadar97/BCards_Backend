const { mongoose } = require("mongoose");
const { DEFAULT_VALIDATION, PHONE, EMAIL, URL } = require("../helpers/mongooseValidators");
const Image = require("../helpers/Image");
const Address = require("../helpers/Address");

const cardSchema = new mongoose.Schema({
  title: DEFAULT_VALIDATION,
  subtitle: DEFAULT_VALIDATION,
  description: {
    ...DEFAULT_VALIDATION,
    maxLength: 1024,
  },
  phone: PHONE,
  email: EMAIL,
  web: URL,
  image: Image,
  address: Address,
  bizNumber: {
    type: Number,
    min: 1_000_000,
    max: 9_999_999,
  },
  likes: [String],
  createAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
