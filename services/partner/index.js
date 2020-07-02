const logger = require('../../utils/logger');

const { Partner } = require('../../clients/Database');

const find = async (where) => {
  const partner = await Partner.find(where);
  return partner;
};

const ServicePartner = {
  async getPartner(params) {
    let partnerResponse = '';

    try {
      partnerResponse = await find(params);
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
