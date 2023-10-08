const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
  const registered_user = sequelize.define("registered_user", {
     name: {
       type: Sequelize.STRING,
       allowNull: false
     },
     grade: {
       type: Sequelize.STRING,
     },
     email: {
      type: Sequelize.STRING,
    },
     phone_no: {
       type: Sequelize.STRING,
     },
     state: {
       type: Sequelize.STRING,
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
  return registered_user;
}

