const BusinesessPartner = require('../../businesses/partner');
const logger = require('../../utils/logger');

const PartnerController = {
  async handle(req, res, next) {
    try {
      req.query.host = req.headers.host;
      const data = await BusinesessPartner.handle(req.query);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Partner Controller:', e.message);
      logger.debug(e);
      // error handler middleware
      return next(e);
    }
  },
  async create(req, res, next) {
    try {
      const data = await BusinesessPartner.create(req.body);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Partner Controller:', e.message);
      logger.debug(e);
      // error handler middleware
      return next(e);
    }
  },
};

module.exports = PartnerController;
