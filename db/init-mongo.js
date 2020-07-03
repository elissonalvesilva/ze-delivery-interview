// init mongo database
/* eslint-disable no-undef */
const database = 'delivery';
db = db.getSiblingDB(database);
// create use mongo and set a property read adn write
db.createUser({
  user: 'delivery',
  pwd: 'd3l1v3ry',
  roles: [
    { role: 'readWrite', db: `${database}` },
  ],
});
