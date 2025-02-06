const Joi = require("joi");

const booleanValidation = (data) => {
  const schema = Joi.object({
    isBusiness: Joi.boolean().required().messages({
      "boolean.base": '"isBusiness" must be a boolean value (true or false)',
      "any.required": '"isBusiness" is required',
    }),
  });

  return schema.validate(data);
};

module.exports = booleanValidation;
