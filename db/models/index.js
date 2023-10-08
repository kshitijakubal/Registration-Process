const Sequelize = require("sequelize");
const dbConfig = require("../../config/dbConfig");
let db = {};

console.log(dbConfig)

const connection = new Sequelize(
   dbConfig.connection.database,
   dbConfig.connection.username,
   dbConfig.connection.password,
    {
      host: dbConfig.connection.host,
      port: dbConfig.connection.port,
      dialect: "mysql",
      pool: {
         max: 5,
         min: 0,
         acquire: 20000,
         idle: 10000
     },
     "define": {
      "underscored": true
  }
    }
  );

Object.keys(db).forEach((modelName) => {
   console.log("Model name:",modelName)
   if (db[modelName].associate) {
       db[modelName].associate(db);
   }
});

db.connection = connection;
db.Sequelize = Sequelize;

db.registered_user = require("./registered_users.model")(connection, Sequelize);
db.temp = require("./temp.model")(connection, Sequelize);
db.otp = require("./otp.model")(connection, Sequelize);
db.events_registration = require("./events_registration.model")(connection, Sequelize);

connection.sync()

connection.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = db;

