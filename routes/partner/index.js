const { Router } = require('express');
const { celebrate } = require('celebrate');

const joiSchema = require('./validation');
const partner = require('../../controllers/partner');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

/**
 * Get Joi Schema and using celebrate to create a validation middleware
 * @param {Object} req - Request object
 * @param {Object} res - Response bject
 * @param {Object} next - Next object
 */
const validateMiddleware = (req, res, next) => {
  const schema = joiSchema;

  celebrate(schema, joiOptions)(req, res, next);
};

router.get(
  '/',
  validateMiddleware,
  partner.handle,
);

router.post(
  '/',
  // validateMiddleware,
  partner.create,
);

module.exports = router;
