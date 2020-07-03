const { Partner } = require('../../models');

const PartnerClient = {
  async find(where) {
    let partner = '';
    const { allnearest } = where;
    delete where.allnearest;

    if (allnearest) {
      partner = await Partner.find(where);
      return partner;
    }

    partner = Partner.findOne(where);
    return partner;
  },
};

module.exports = PartnerClient;
