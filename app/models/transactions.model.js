const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
      transaction_id:{
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
      },
      amount:{
          type: DataTypes.INTEGER,
          allowNull:false
      },
      type1:{
          type:DataTypes.STRING(100),
          allowNull: false
      },
      parent_id:{
          type: DataTypes.INTEGER,
          hierarchy: true
      }
    })
}