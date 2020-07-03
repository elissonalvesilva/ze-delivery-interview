const connectToMongo = require('./database');

const initilizer = async () => {
  // wait to connect to database
  await connectToMongo();
};

module.exports = initilizer;
