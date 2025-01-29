const Joi = require("joi");

const loginValidation = (user) => {
  const schema = Joi.object({
    email: Joi.string()
      .pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
      .required()
      .messages({
        "string.pattern.base": 'user "email" must be a valid email',
        "string.empty": 'user "email" is required',
      }),
    password: Joi.string().required().messages({
      "string.empty": 'user "password" is required',
    }),
  });
  return schema.validate(user);
};

module.exports = loginValidation;
