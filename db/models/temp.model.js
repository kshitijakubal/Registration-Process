const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
  const temp = sequelize.define("temp", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    grade: {
      type: Sequelize.INTEGER,
    },
    email: {
     type: Sequelize.STRING,
   },
    phone_no: {
      type: Sequelize.STRING(10),
    },
    state: {
      type: Sequelize.INTEGER,
    },
    city: {
     type: Sequelize.STRING,
   },
   school_name: {
     type: Sequelize.STRING,
   }
  },
  {
   classMethods: {},
   sync: { force: true },
   freezeTableName: true,
 });
  return temp;
}

 
