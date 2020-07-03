const { Router } = require('express');
const { celebrate } = require('celebrate');

const { validationQuery, validationBody } = require('./validation');
const partner = require('../../controllers/partner');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

/**
 * Get Joi Schema query and using celebrate to create a validation middleware
 * to query string
 * @param {Object} req - Request object
 * @param {Object} res - Response bject
 * @param {Object} next - Next object
 */
const validateMiddleware = (req, res, next) => {
  const schema = validationQuery;

  celebrate(schema, joiOptions)(req, res, next);
};

/**
 * Get Joi Schema body and using celebrate to create a validation middleware
 * to body params
 * @param {Object} req - Request object
 * @param {Object} res - Response bject
 * @param {Object} next - Next object
 */
const validateMiddlewarePost = (req, res, next) => {
  const schema = validationBody;

  celebrate(schema, joiOptions)(req, res, next);
};

router.get(
  '/',
  validateMiddleware,
  partner.handle,
);

router.post(
  '/',
  validateMiddlewarePost,
  partner.create,
);

module.exports = router;
