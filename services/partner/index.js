const logger = require('../../utils/logger');
const PartnerClient = require('../../clients/partner');

/**
 * ServicePartner
 */
const ServicePartner = {
  /**
   * Get Partner from database
   * @param {Object} params - formatted object to make a request to database
   */
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
  async createPartner(params) {
    let partnerResponse = '';
    try {
      partnerResponse = await PartnerClient.create(params);
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
