const logger = require('../../utils/logger');
const ResponseError = require('../../utils/error/response-error');

const { Partner } = require('../../clients/Database');

const find = async ({ id, coordinates }) => {
  const where = {};

  if (id && coordinates) {
    throw new ResponseError({
      code: 0,
      message: 'Must to exist only one filter',
    });
  }

  if (id) {
    where.id = id;
  }

  if (coordinates) {
    where.coordinates = coordinates;
  }

  const partner = await Partner.findOne(where);
  return partner;
};

const ServicePartner = {
  async get(params) {
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
