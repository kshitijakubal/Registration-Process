const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
  const otp = sequelize.define("otp", {
      email: {
        type: Sequelize.STRING,
        // allowNull: false
      },
      otp: {
        type: Sequelize.STRING,
        // allowNull: false
      },
 },
 {
  classMethods: {},
  sync: { force: true },
  freezeTableName: true,
}
 );
 return otp;
}
 
