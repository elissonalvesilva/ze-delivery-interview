const { Partner } = require('../../models');
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
};

module.exports = PartnerClient;
