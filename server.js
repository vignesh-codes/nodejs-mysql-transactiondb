//Server.js  File

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const log = require('simple-node-logger').createSimpleFileLogger('auth.log','YYYY-MM-DD HH:mm:ss.SSS');

const app = express();

var corsOptions = {
  origin: "http://18.236.156.63",
  optionsSuccessStatus: 200

};

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// 
// app.use(function (req, res, next) {
// 
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
// 
  // next();
// });


const db = require("./app/models");
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  // initial();
});

//Base Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome " });
});

// Import RBA routes
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

