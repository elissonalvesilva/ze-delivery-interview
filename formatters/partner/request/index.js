const PartnerRequestFormatter = {
  format(query) {
    const formattedRequest = {};

    if ('pid' in query) {
      formattedRequest.id = query.pid;
    }

    if (('lat' in query) && ('long' in query)) {
      formattedRequest.coverageArea = {
        $geoIntersects:
          {
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
