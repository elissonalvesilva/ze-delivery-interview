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

module.exports = { PartnerResponseFormatter };
