const PartnerBusinesses = require('../../../businesses/partner');
const ServicePartner = require('../../../services/partner');
const {
  PartnerRequestFormatter,
} = require('../../../formatters/partner/request');
const {
  PartnerResponseFormatter,
} = require('../../../formatters/partner/response');

describe('PartnerBusinesses', () => {
  let sandbox;
  let serviceResponse;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should return a response valid response using filter by id', async () => {
    serviceResponse = {
      id: 1,
      tradingName: 'Adega da Cerveja - Pinheiros',
      ownerName: 'Zé da Silva',
      document: '1432132123891/0001', // CNPJ
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [[[30, 20], [45, 40], [10, 40], [30, 20]]],
          [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]],
        ],
      },
      address: {
        type: 'Point',
        coordinates: [-46.57421, -21.785741],
      },
    };

    sandbox.stub(ServicePartner, 'getPartner').returns(
      Promise.resolve(serviceResponse),
    );

    sandbox.stub(PartnerRequestFormatter, 'format').returns({
      id: 1,
    });

    sandbox.stub(PartnerResponseFormatter, 'format').returns({
      pdvs: [serviceResponse],
    });

    const query = {
      id: 1,
    };

    serviceResponse = {
      httpCode: 200,
      response: {
        pdvs: [serviceResponse],
      },
    };

    const response = await PartnerBusinesses.handle(query);
    expect(response).to.deep.equal(serviceResponse);
  });

  it('should return a response invalid response with error', async () => {
    serviceResponse = {
      error: true,
      message: 'Query Not found',
    };

    sandbox.stub(ServicePartner, 'getPartner').returns(
      Promise.resolve(serviceResponse),
    );

    sandbox.stub(PartnerRequestFormatter, 'format').returns({
      id: 1,
    });

    const query = {
      id: 1,
    };

    serviceResponse = {
      httpCode: 400,
      response: {
        message: 'Error to get partner',
        error: 'Query Not found',
      },
    };

    const response = await PartnerBusinesses.handle(query);
    expect(response).to.deep.equal(serviceResponse);
  });

  it('should return a response empty response', async () => {
    serviceResponse = {};

    sandbox.stub(ServicePartner, 'getPartner').returns(
      Promise.resolve(serviceResponse),
    );

    sandbox.stub(PartnerRequestFormatter, 'format').returns({
      id: 1,
    });

    const query = {
      id: 1,
    };

    serviceResponse = {
      httpCode: 404,
      response: {
        message: 'Query not found',
      },
    };

    const response = await PartnerBusinesses.handle(query);
    expect(response).to.deep.equal(serviceResponse);
  });
});
