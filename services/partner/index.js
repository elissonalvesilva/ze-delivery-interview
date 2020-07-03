const logger = require('../../utils/logger');
const PartnerClient = require('../../clients/partner');

const ServicePartner = {
  async getPartner(params) {
    let partnerResponse = '';

    try {
      partnerResponse = await PartnerClient.find(params);
    } catch (error) {
      logger.error(error);
      partnerResponse = {
        error: true,
        message: error.message,
      };
    }

    return partnerResponse;
  },
};

module.exports = ServicePartner;
