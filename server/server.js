var mysql = require('mysql');
var http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
//var isExist = false ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '<<YOUR MYSQL PASSWORD>>',
  database: 'trainer_dee',
  port: '3306',
  dateStrings: true

});

connection.connect();

app.listen(port, () => console.log(`Listening on port ${port}`));