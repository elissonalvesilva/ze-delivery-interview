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

    return formattedRequest;
  },
};

const PartnerResponseFormatter = {
  format(data) {
    const formattedResponse = {};

    if (data.length > 0) {
      formattedResponse.pdvs = data;
    } else {
      formattedResponse.pdv = data;
    }

    return formattedResponse;
  },
};

module.exports = { PartnerRequestFormatter, PartnerResponseFormatter };
