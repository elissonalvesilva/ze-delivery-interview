const {
  PartnerRequestFormatter,
} = require('../../../../formatters/partner/request');

describe('Partner Request Formatter', () => {
  it('should return a formatted response with id', () => {
    const query = {
      pid: 12,
    };

    const returnResponse = {
      id: 12,
    };

    const response = PartnerRequestFormatter.format(query);
    expect(response).to.be.an('object').to.deep.equals(returnResponse);
  });

  it('should return a formatted response with lat and long', () => {
    const query = {
      lat: -12,
      long: 30,
    };

    const response = PartnerRequestFormatter.format(query);
    expect(response).to.be.an('object').to.deep.equal({
      coverageArea: {
        $geoIntersects:
          {
            $geometry:
            {
              type: 'Point',
              coordinates:
              [query.lat, query.long],
            },
          },
      },
    });
  });

  it('should return a formatted response with lat, long and allNearest', () => {
    const query = {
      lat: -12,
      long: 30,
      allnearest: true,
    };

    const returnResponse = {
      coverageArea: {
        $geoIntersects:
          {
            $geometry:
            {
              type: 'Point',
              coordinates:
              [query.lat, query.long],
            },
          },
      },
      allnearest: true,
    };

    const response = PartnerRequestFormatter.format(query);
    expect(response).to.be.an('object').to.deep.equal(returnResponse);
  });
});
