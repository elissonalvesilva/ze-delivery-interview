const versionRoute = require('./version');
const healthRoute = require('./health');
const partnerRoute = require('./partner');

const routes = {
  versionRoute,
  healthRoute,
  partnerRoute,
};

module.exports = routes;
