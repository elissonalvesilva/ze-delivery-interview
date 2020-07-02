const BusinesessPartner = require('../../businesses/partner');
const logger = require('../../utils/logger');

const DeliveryController = {
  async handle(req, res, next) {
    try {
      req.query.host = req.headers.host;
      const data = await BusinesessPartner.handle(req.query);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Delivery Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = DeliveryController;
