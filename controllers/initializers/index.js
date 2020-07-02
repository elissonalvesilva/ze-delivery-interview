const connectToMongo = require('./database');

const initilizer = async () => {
  await connectToMongo();
};

module.exports = initilizer;
