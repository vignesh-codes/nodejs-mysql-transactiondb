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

//initializing the tables
db.TransactionTable = sequelize.define('TransactionTable', { spentOn: Sequelize.ENUM('cars', 'shopping', 'movies'), amount: Sequelize.FLOAT });
//specify whether hierarchy or not. If hierarchy, the sequalize hierarchy will create another table to store hierarchy info
db.TransactionTable.isHierarchy();


module.exports = db;