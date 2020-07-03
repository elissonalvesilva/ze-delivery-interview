const { Joi } = require('celebrate');
const { throwBadRequest } = require('../../utils/error/bad-request');

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
          console.log(errors[0]);
          // throw bad request with default message
          throwBadRequest({
            fields,
          });
        }
      }
    }),
};
