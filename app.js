const express = require('express');

const errorHandler = require('./middlewares/error-handler');
const { applyMiddlewares } = require('./middlewares/index');
const {
  versionRoute,
  healthRoute,
  partnerRoute,
} = require('./routes');

const app = express();
applyMiddlewares(app);

app.use('/version', versionRoute);

app.use('/health', healthRoute);

app.use('/partner', partnerRoute);

app.use(errorHandler);

module.exports = app;
