const Sequelize = require('sequelize');

// Remove the example file and uncomment the below
// const dbconfig = require('./dbconfig.js');
const dbconfig = require('./example_dbconfig.js');

const sequelize = new Sequelize(
  dbconfig.database,
  dbconfig.username,
  dbconfig.pw,
  {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    storage: './server/db/db.sqlite'
  }
);

sequelize.authenticate()
.then(function(err) {
  console.log('Connection has been established successfully.');
})
.catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

module.exports = sequelize;
