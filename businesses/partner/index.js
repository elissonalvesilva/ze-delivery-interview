const ServicePartner = require('../../services/partner');

const BusinesessPartner = {
  async handle(req) {
    let httpCode = 200;
    let response = '';
    const { params } = req;
    response = await ServicePartner.get(params);

    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to get partner',
        error: response.message,
      };
      return {
        httpCode,
        response,
      };
    }

    return {
      httpCode,
      response,
    };
  },
};

module.exports = BusinesessPartner;
