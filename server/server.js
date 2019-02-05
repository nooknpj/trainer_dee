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

app.post('/trainer_dee/filter_by_service', (req, res) => {
  let sql = 'select * from course c where c.CourseID = (select CourseID FROM course c where c.Service = ?)';

  connection.query(sql, req.body['Service'], (error, result) => {
    if (error) throw error;
    // let list_result = [];

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    console.log(all);
    console.log(result);

  });
});

app.post('/trainer_dee/filter_by_gender', (req, res) => {
  let sql = 'SELECT * from course c where c.CourseID = (Select CourseID FROM user u natural join trainer t natural join course c where u.Gender = ?)';

  connection.query(sql, req.body['Gender'], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    console.log(all);
    console.log(result);

  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));