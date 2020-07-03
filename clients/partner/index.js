const _ = require('lodash');
const { Partner } = require('../../models');
const RequestError = require('../../utils/error/request-error');
// Partner Client
const PartnerClient = {
  /**
   * Find Partner
   * if flag allnearest is true return all nearest partner by lat and long,
   * if not get only one
   *
   * @param {Object} where - formatted request to mongo dabase
   * @returns partner
   */
  async find(where) {
    let partner = '';
    const { allnearest } = where;
    delete where.allnearest;

    // get all nearest partners
    if (allnearest) {
      partner = await Partner.find(where);
      return partner;
    }

    partner = Partner.findOne(where);
    return partner;
  },
  async create(params) {
    let partner = '';
    const {
      document,
    } = params;

    partner = await Partner.findOne({ document });
    if (_.isEmpty(partner)) {
      partner = new Partner(params);
      partner = await partner.save(partner);
      return partner;
    }

    throw new RequestError({
      message: 'Partner exists in database',
    });
  },
};

module.exports = PartnerClient;
