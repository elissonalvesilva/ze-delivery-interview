const { Joi } = require('celebrate');
const { throwBadRequest } = require('../../../utils/error/bad-request');

/**
 * In query string validate
 * - if pass pid or lat
 * - if pid is a number
 * - if lat in inside query, long is required
 * - if pass allnearest and it it's truthy
 *
 * If exists a erro set a throwBadRequest
 */
module.exports = {
  query: Joi.object({
    pid: Joi.number(),
    lat: Joi.number().precision(10),
    long: Joi.number().precision(10).when('lat', {
      is: Joi.number().required(),
      then: Joi.required(),
    }),
    allnearest: Joi.boolean()
      .truthy('true')
      .truthy('1')
      .falsy('false')
      .falsy('0'),
  }).or('pid', 'lat')
    .error((errors) => {
      if (errors[0]) {
        if (errors[0].code === 'object.missing') {
          throwBadRequest({
            code: 3002,
            message: 'Missing pid or lat and long',
            fields: ['pid', 'long', 'lat'],
          });
        } else {
          let fields = [];
          if (errors[0].path) {
            fields = errors[0].path;
          }
          // throw bad request with default message
          throwBadRequest({
            fields,
          });
        }
      }
    }),
};
