const PartnerClient = require('../../../clients/partner');
const { Partner } = require('../../../models');

describe('Partner Client', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should return a response with one pdv', async() => {
    const resposeClient = {
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

    sandbox.stub(Partner, 'findOne').returns(
      Promise.resolve(resposeClient),
    );

    const where = {
      id: 1,
      lat: 30,
      long: 20,
      allNearest: false,
    };

    const response = await PartnerClient.find(where);
    expect(response).to.deep.equal(resposeClient);
  });

  it('should return a response with many pdvs using allNearest', async() => {
    const resposenClient = [
      {
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
      },
      {
        id: 2,
        tradingName: 'Adega da Cerveja - Botafogo',
        ownerName: 'Zé Carlinhos',
        document: '143213212333291/0001', // CNPJ
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]],
          ],
        },
        address: {
          type: 'Point',
          coordinates: [-41.57421, -31.785741],
        },
      },
    ];

    sandbox.stub(Partner, 'find').returns(
      Promise.resolve(resposenClient),
    );

    const where = {
      id: 1,
      lat: 30,
      long: 20,
      allnearest: true,
    };

    const response = await PartnerClient.find(where);
    expect(response).to.deep.equal(resposenClient);
  });
});
