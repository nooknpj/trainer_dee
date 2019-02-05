var mysql = require("mysql");
var http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
//var isExist = false ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "trainer_dee",
  port: "3306",
  dateStrings: true
});

connection.connect();

app.post("/trainer_dee/search_keyword", (req, res) => {
  // let sql = "SELECT * FROM trainer t natural join course co natural join user u WHERE CONCAT(CName, CourseID, Service) LIKE '? %'";
  let sql = "SELECT * FROM tuser u";
  connection.query(sql, (error, result) => {
    //DO SOMETHING
  });
});

app.post("/trainer_dee/filter_by_service", (req, res) => {
  let desiredFilters = new Set();
  if (req.body["yoga"] == 1) desiredFilters.add(0);
  if (req.body["cardio"] == 1) desiredFilters.add(1);
  if (req.body["weightTraining"] == 1) desiredFilters.add(2);

  console.log(desiredFilters);

  let sql =
    "select * from course c where c.CourseID = (select CourseID FROM course c where c.Service = 0)";

  connection.query(sql, req.body["Service"], (error, result) => {
    if (error) throw error;
    // let list_result = [];

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    //console.log(all);
  });
});

app.post("/trainer_dee/filter_by_gender", (req, res) => {
  let sql =
    "SELECT * from course c where c.CourseID = (Select CourseID FROM user u natural join trainer t natural join course c where u.Gender = ?)";

  connection.query(sql, req.body["Gender"], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    console.log(all);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
