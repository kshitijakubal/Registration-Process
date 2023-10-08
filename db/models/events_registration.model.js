const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
  const events_registration = sequelize.define("events_registration", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
 },
 {
  classMethods: {},
  sync: { force: true },
  freezeTableName: true,
});
 return events_registration;
}

 
