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

app.post('/trainer_dee/search_keyword', (req, res) => {
  // let sql = "SELECT * FROM trainer t natural join course co natural join user u WHERE CONCAT(CName, CourseID, Service) LIKE '? %'";
  let sql = "SELECT * FROM tuser u";
  connection.query(sql, (error, result) => {
    //DO SOMETHING
  });
});

app.post("/trainer_dee/filter_by_service", (req, res) => {
  let desiredFilters = []
  let sql = ""
  if (req.body["yoga"] == 1) desiredFilters.push(0);
  if (req.body["cardio"] == 1) desiredFilters.push(1);
  if (req.body["weightTraining"] == 1) desiredFilters.push(2);

  if(desiredFilters.length == 0){
      res.send([]);
  }else if(desiredFilters.length == 1){
      sql = "SELECT c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,u.fName,u.sName,u.gender,u.telNo\
      FROM course c, user u \
      where c.service=? and c.TrainerId = u.userID;";
      connection.query(sql, [desiredFilters[0]], (error, result) => {
        if (error) throw error;
    
        let all = JSON.parse(JSON.stringify(result));
        res.send(all);
        //console.log(all);
      });
    } else if(desiredFilters.length == 2){
      sql = "SELECT c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,u.fName,u.sName,u.gender,u.telNo\
      FROM course c, user u \
      where (c.service=? or c.service=?) and c.TrainerId = u.userID;";
      connection.query(sql, [desiredFilters[0], desiredFilters[1]], (error, result) => {
        if (error) throw error;
    
        let all = JSON.parse(JSON.stringify(result));
        res.send(all);
        //console.log(all);
      });
    } else if(desiredFilters.length == 3){
      sql = "SELECT c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,u.fName,u.sName,u.gender,u.telNo\
      FROM course c, user u \
      where c.TrainerId = u.userID;";
      connection.query(sql, (error, result) => {
        if (error) throw error;
    
        let all = JSON.parse(JSON.stringify(result));
        res.send(all);
        //console.log(all);
      });
  }
});

app.post("/trainer_dee/filter_by_gender", (req, res) => {
  let desiredFilters = []
  let sql = ""
  if (req.body["male"] == 1) desiredFilters.push(0);
  if (req.body["female"] == 1) desiredFilters.push(1);
  if (req.body["others"] == 1) desiredFilters.push(2);

  if(desiredFilters.length == 0){
    res.send([]);
  } else if(desiredFilters.length == 1){
    let sql = "Select * FROM user u, trainer t, course c where u.userid = t.trainerid and t.trainerid = c.trainerid and u.Gender = ?";

  connection.query(sql, [desiredFilters[0]], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    console.log(all);
  });
  } else if(desiredFilters.length == 2){
    let sql = "Select * FROM user u, trainer t, course c where u.userid = t.trainerid and t.trainerid = c.trainerid and (u.Gender = ? or u.Gender = ?)";

  connection.query(sql, [desiredFilters[0], desiredFilters[1]], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    console.log(all);
  });
  } else if(desiredFilters.length == 3){
    let sql = "Select * FROM user u, trainer t, course c where u.userid = t.trainerid and t.trainerid = c.trainerid";

  connection.query(sql, (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    console.log(all);
  });
  }
});
app.listen(port, () => console.log(`Listening on port ${port}`));
