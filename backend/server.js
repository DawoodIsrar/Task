const express = require("express");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
const cors = require("cors");
// const jsonwebtoken = require("jsonwebtoken");
const app = express();
// const config = require("./App/config/auth.config")
require("dotenv").config();
const stocks = require('./App/routers/stock')
const signUp = require("./App/routers/signup");
const logIn = require("./App/routers/login");

const { swagggerServe, swaggerSetup } = require("./App/config/swagger");

const path = require('path')
// parse requests of content-type - application/json
app.use(bodyParser.json());

const whitelist = ["http://localhost:8000","http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};


app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./App/models");
//database connection
db.sequelize.sync({ force: true }).then(() => {
  console.log("database connected");
  // initial()
});
//process.env.PORT ||
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const users = db.users;

app.use(signUp);
app.use(logIn);
app.use(stocks)
//==========================================================
//============(log in with google)==========================


app.get("/", function (req, res) {
  res.send("Welcome to the backend  system ");
});

app.use("/api-doc", swagggerServe, swaggerSetup);



