const {
  PartnerResponseFormatter,
} = require('../../../../formatters/partner/response');

describe('Partner Response Formatter', () => {
  it('should return a formatted response with one element', () => {
    const data = {
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
      }, // Área de Cobertura
      address: {
        type: 'Point',
        coordinates: [-46.57421, -21.785741],
      }, // Localização do PDV
    };

    const response = PartnerResponseFormatter.format(data);
    expect(response).to.be.an('object').to.deep.equals({
      pdv: data,
    });
  });

  it('should return a formatted response with many elements', () => {
    const data = [
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
        }, // Área de Cobertura
        address: {
          type: 'Point',
          coordinates: [-46.57421, -21.785741],
        }, // Localização do PDV
      },
      {
        id: 2,
        tradingName: 'Adega da Cerveja - Capão Bonito',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001', // CNPJ
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]],
          ],
        }, // Área de Cobertura
        address: {
          type: 'Point',
          coordinates: [-46.57421, -21.785741],
        }, // Localização do PDV
      },
    ];

    const response = PartnerResponseFormatter.format(data);
    expect(response).to.be.an('object').to.deep.equals({
      pdvs: data,
    });
  });
});
