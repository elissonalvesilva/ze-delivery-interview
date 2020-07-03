// Partner Request Formatter
const PartnerRequestFormatter = {
  /**
   * Get query string from request and format to mongo request
   * Ex:
   * - if get a pid:
   * {
   *   id: <pid>
   * }
   *
   * - if get a lat and long:
   * {
   *   coverageArea: {
   *    $geoIntersects: {
   *       $geometry:
   *       {
   *         type: 'Point',
   *         coordinates:
   *         [query.lat, query.long],
   *       },
   *     },
   *  }
   * }
   *
   * - if get id, lat and long:
   * {
   *   id: <pid>
   *   coverageArea: {
   *    $geoIntersects: {
   *       $geometry:
   *       {
   *         type: 'Point',
   *         coordinates:
   *         [<lat>, <long>],
   *       },
   *     },
   *  }
   * }
   *
   * - if get allnearest:
   * {
   *  allnearest: true
   * }
   *
   * @param {Object} query - Query string object from request
   * @returns {Object} formattedRequest - Formatted request to mongo
   */
  format(query) {
    const formattedRequest = {};

    if ('pid' in query) {
      formattedRequest.id = query.pid;
    }

    if (('lat' in query) && ('long' in query)) {
      formattedRequest.coverageArea = {
        $geoIntersects: {
          $geometry:
          {
            type: 'Point',
            coordinates:
            [query.lat, query.long],
          },
        },
      };
    }

    if ('allnearest' in query) {
      formattedRequest.allnearest = query.allnearest;
    }

    return formattedRequest;
  },
};

module.exports = { PartnerRequestFormatter };
