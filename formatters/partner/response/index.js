const _ = require('lodash');
// Partner Response Formatter
const PartnerResponseFormatter = {
  /**
   * format response
   * -if response from mongo is a array, the response formatted is equals to
   * {
   *  pdvs: [
   *   {
   *    id: <ID>,
   *    ...
   *   },
   *   ...
   *  ]
   * }
   *
   * -if response from mongo is a object, the response formatted is equals to
   * {
   *  pdv: {
   *    id: <ID>,
   *    ...
   *   }
   * }
   * @param {Array | Object} data
   * @returns {Object} formattedResponse - return a formatted response
   */
  format(data) {
    const formattedResponse = {};

    if (_.isArray(data)) {
      formattedResponse.pdvs = data;
    } else if (_.isObject(data)) {
      formattedResponse.pdv = data;
    }

    return formattedResponse;
  },
};

module.exports = { PartnerResponseFormatter };
