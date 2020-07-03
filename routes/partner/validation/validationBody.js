const { Joi } = require('celebrate');
const { throwBadRequest } = require('../../../utils/error/bad-request');

// validation body
module.exports = {
  body: Joi.object({
    id: Joi.number().optional(),
    tradingName: Joi.string().required(),
    ownerName: Joi.string().required(),
    document: Joi.string().required(),
    coverageArea: Joi.object({
      type: Joi.string().required(),
      coordinates: Joi.array().required(),
    }).required(),
    address: Joi.object({
      type: Joi.string().required(),
      coordinates: Joi.array().required(),
    }).required(),
  }).error((errors) => {
    if (errors[0]) {
      let fields = [];
      if (errors[0].path) {
        fields = errors[0].path;
      }
      // throw bad request with default message
      throwBadRequest({
        fields,
      });
    }
  }),
};
