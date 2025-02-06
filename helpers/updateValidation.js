const Joi = require("joi");

const updateUserValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().min(2).max(50).optional(),
      middle: Joi.string().min(2).max(50).allow("").optional(),
      last: Joi.string().min(2).max(50).optional(),
    }).optional(),
    phone: Joi.string()
      .pattern(/^0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}$/)
      .optional()
      .messages({ "string.pattern.base": "Invalid phone number format" }),
    image: Joi.object({
      url: Joi.string().uri().optional(),
      alt: Joi.string().optional(),
    }).optional(),
    address: Joi.object({
      state: Joi.string().allow("").optional(),
      country: Joi.string().optional(),
      city: Joi.string().optional(),
      street: Joi.string().optional(),
      houseNumber: Joi.number().optional(),
      zip: Joi.number().optional(),
    }).optional(),
  });

  return schema.validate(user);
};

module.exports = updateUserValidation;
