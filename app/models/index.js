const config = require("../config/db.config.js");

const Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize);

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;




db.TransactionTable = sequelize.define('TransactionTable', { spentOn: Sequelize.ENUM('cars', 'shopping', 'movies'), amount: Sequelize.FLOAT });
db.TransactionTable.isHierarchy();


module.exports = db;