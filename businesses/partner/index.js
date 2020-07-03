const _ = require('lodash');

const ServicePartner = require('../../services/partner');
const { PartnerRequestFormatter } = require('../../formatters/partner/request');
const {
  PartnerResponseFormatter,
} = require('../../formatters/partner/response');

// Businesses Partner
const BusinesessPartner = {
  /**
   * Get partner
   * @param {Object} query - Request Query string
   * @returns {Object} - { httpCode, response }
   */
  async handle(query) {
    let httpCode = 200;
    let response = '';

    // format request
    const formatterRequest = PartnerRequestFormatter.format(query);
    response = await ServicePartner.getPartner(formatterRequest);

    if (response && 'error' in response) {
      httpCode = 400;
      response = {
        message: 'Error to get partner',
        error: response.message,
      };

      return {
        httpCode,
        response,
      };
    }

    if (_.isEmpty(response)) {
      httpCode = 404;
      response = {
        message: 'Query not found',
      };

      return {
        httpCode,
        response,
      };
    }

    // format response
    response = PartnerResponseFormatter.format(response);

    return {
      httpCode,
      response,
    };
  },
};

module.exports = BusinesessPartner;
