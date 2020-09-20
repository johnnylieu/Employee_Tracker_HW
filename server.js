var mysql = require("mysql");
var inquirer = require("inquirer");
const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 8080,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "ice_creamDB"
  });

  app.listen(PORT, function () {
    console.log('listening on port ' + PORT);
});