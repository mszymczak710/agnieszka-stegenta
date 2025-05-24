const joi = require("joi");

const contactFormSchema = joi.object({
  full_name: joi.string().max(100).required().messages({
    "string.empty": "Pole jest wymagane.",
    "string.max": "Pole może zawierać maksymalnie 100 znaków.",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Pole jest wymagane.",
    "string.email": "Podaj poprawny adres e-mail.",
  }),
  phone_number: joi
    .string()
    .pattern(/^(\+?[1-9]\d{0,2}\s?)?(\d{3}\s?\d{3}\s?\d{3})$/)
    .allow(null, "")
    .messages({
      "string.pattern.base":
        "Numer telefonu musi mieć format: '+999999999'. Może zawierać do 15 cyfr.",
    }),
  description: joi.string().max(500).required().messages({
    "string.empty": "Pole jest wymagane.",
    "string.max": "Pole może zawierać maksymalnie 500 znaków.",
  }),
  recaptcha: joi.string().required().messages({
    "string.empty": "reCAPTCHA jest wymagana.",
  }),
});

const validateContactForm = (req, res, next) => {
  const { error } = contactFormSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const fieldErrors = error.details.reduce((acc, err) => {
      const field = err.path[0];
      acc[field] = err.message;
      return acc;
    }, {});

    return res.status(400).json({
      success: false,
      errors: fieldErrors,
    });
  }
  next();
};

module.exports = validateContactForm;
