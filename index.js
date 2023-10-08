const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config()

const { Router } = require("./routes/Authentication/index")
// App Initialization
const app = express();
// Defining cors
const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions))
// For processing input data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// Defining Route
app.use("/",Router)
// Importing db
const {db }= require("./db/models");
// db.sequelize.sync();

// Defining Port 
const PORT = process.env.PORT || 8000;

app.listen(PORT,() => {
    console.log("Server is up and running on Port:",PORT)
})

