const ServicePartner = require('../../services/partner');
const {
  PartnerRequestFormatter,
  PartnerResponseFormatter,
} = require('../../formatters/partner');

const BusinesessPartner = {
  async handle(query) {
    let httpCode = 200;
    let response = '';

    const formatterRequest = PartnerRequestFormatter.format(query);
    response = await ServicePartner.getPartner(formatterRequest);

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

    if (!response) {
      httpCode = 404;
      response = {
        message: 'Query not found',
      };

      return {
        httpCode,
        response,
      };
    }

    response = PartnerResponseFormatter.format(response);

    return {
      httpCode,
      response,
    };
  },
};

module.exports = BusinesessPartner;
