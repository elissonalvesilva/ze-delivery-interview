const PartnerService = require('../../../services/partner');
const PartnerClient = require('../../../clients/partner');

const logger = require('../../../utils/logger');

describe('Partner Service', () => {
  let sandbox;
  let partner;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(logger, 'error');
    partner = {
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
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('method request', () => {
    it(
      'should return a valid response object on valid query object',
      async () => {
        sandbox.stub(PartnerClient, 'find').returns(
          Promise.resolve(partner),
        );
        const query = {
          id: 1,
        };

        const response = await PartnerService.getPartner(query);
        expect(response).to.equals(partner);
      },
    );

    it('should return a error to get partner', async () => {
      sandbox.stub(PartnerClient, 'find').returns(
        Promise.reject(new Error('handle error on rejection')),
      );

      const response = await PartnerService
        .getPartner(partner);
      expect(response).to.deep.equal({
        error: true,
        message: 'handle error on rejection',
      });
    });

    it('should return a created partner', async () => {
      sandbox.stub(PartnerClient, 'create').returns(
        Promise.resolve(partner),
      );

      const response = await PartnerService
        .createPartner(partner);
      expect(response).to.equals(partner);
    });

    it('should return a error to create partner', async () => {
      sandbox.stub(PartnerClient, 'create').returns(
        Promise.reject(new Error('handle error on rejection')),
      );

      const response = await PartnerService
        .createPartner(partner);
      expect(response).to.deep.equal({
        error: true,
        message: 'handle error on rejection',
      });
    });
  });
});
