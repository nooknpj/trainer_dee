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

// ---------------------------------------------------- DID NOT TEST YET ----------------------------------------------------

app.post("/trainer_dee/view_added_course", (req, res) => {
  let sql = "select * from course c where c.trainerid = ?"
  connection.query(sql, [trainerID], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    // console.log(all);
  });
});

app.post("/trainer_dee/view_profile", (req, res) => {
  let sql = "select * from user u where u.userid = ?"
  connection.query(sql, [userID], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    // console.log(all);
  });
});

app.post("/trainer_dee/edit_profile", (req, res) => {
  let sql = "UPDATE User \
  SET FName = ?, LName = ?, Gender = ?, TelNo = ?, Address = ? \
  WHERE userid = ?"
  connection.query(sql, [firstName, lastName, gender, telNo, address, userID], (error, result) => {
    if (error) throw error;

    res.send('Edit successful');
    // console.log(all);
  });
});

app.post("/trainer_dee/add_course", (req, res) => {
  let sql = "INSERT INTO Course \
(CName, Service, Cost, CourseHour, ImageUrl, CourseDescription, TrainerID) \
values (?, ?, ?, ?, ?, ?, ?)"
const courseID = -1
  connection.query(sql, [courseName, service, cost, courseHour, imgUrl, courseDesc, trainerID], (error, result) => {
    if (error) throw error;

    res.send('Course added');
  });
  sql = "select max(c.courseid) from course c"
  connection.query(sql, (error, result) => {
    if (error) throw error;

    courseID = JSON.parse(JSON.stringify(result));
  });
  sql = "INSERT INTO \
  Location(LocateCourseID, LName, Station, lat, lng) \
  values (?, ?, ?, ?, ?)"
  connection.query(sql, [courseID, locationName, station, lat, lng], (error, result) => {
    if (error) throw error;

    res.send('Location added');
  });
});



// ------------------------------------------------------- ALREADY DONE -------------------------------------------------------
app.post("/trainer_dee/search_location", (req, res) => {
  let sql =
    "select c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,t.rating,u.fName,u.lName,u.gender,u.telNo \
  from trainer t, user u, location l, course c \
  where l.locatecourseid = c.courseid and c.TrainerId = u.userID and u.userID=t.TrainerID and (l.lat BETWEEN ? - 0.0090909 AND ? + 0.0090909) and (l.lng between ? - 0.0090909 and ? + 0.0090909)";
  connection.query(
    sql,
    [req.body.lat, req.body.lat, req.body.lng, req.body.lng],
    (error, result) => {
      if (error) throw error;

      let all = JSON.parse(JSON.stringify(result));
      res.send(all);
      // console.log(all);
    }
  );
});

app.post("/trainer_dee/search_filter", (req, res) => {
  let desiredFilters = req.body;
  let filteredOutItem = [];
  // console.log(desiredFilters);

  let sql =
    "SELECT c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,t.rating,u.fName,u.lName,u.gender,u.telNo \
  FROM course c, user u, trainer t \
  where c.TrainerId = u.userID and u.userID=t.TrainerID";
  if (req.body.serviceFilter["yoga"] == 0) {
    sql += " and c.service != ?";
    filteredOutItem.push(0);
  }
  if (req.body.serviceFilter["cardio"] == 0) {
    sql += " and c.service != ?";
    filteredOutItem.push(1);
  }
  if (req.body.serviceFilter["weightTraining"] == 0) {
    sql += " and c.service != ?";
    filteredOutItem.push(2);
  }
  if (req.body.genderFilter["male"] == 0) {
    sql += " and u.Gender != ?";
    filteredOutItem.push("M");
  }
  if (req.body.genderFilter["female"] == 0) {
    sql += " and u.Gender != ?";
    filteredOutItem.push("F");
  }
  if (req.body.genderFilter["others"] == 0) {
    sql += " and u.Gender != ?";
    filteredOutItem.push("O");
  }
  sql +=
    " and (c.cName like ? or c.courseDescription like ? or u.fname like ? or u.lname like ?)";
  // console.log(sql);
  for (i = 0; i < 4; i++) {
    filteredOutItem.push("%" + desiredFilters.searchKeyWords + "%");
  }

  connection.query(sql, filteredOutItem, (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    // console.log(all);
  });
});

//----------------------------Register and Login------------------------------------------------------------------------

app.post("/trainer_dee/insert_registeredClient", (req, res) => {
  // sql columns userID,FName,lName,Gender,Telno,isTrainer
  console.log("hello");
  let sqlUser =
    "INSERT INTO user (userID,FName,lName,gender,telNo,Address,isTrainer) VALUE(?,?,?,?,?,?,?)";
  connection.query(
    sqlUser,
    [
      req.body.userID,
      req.body.fName,
      req.body.lName,
      req.body.gender,
      req.body.telNo,
      req.body.address,
      req.body.isTrainer
    ],
    error => {
      if (error) throw error;
      // console.log(all);
    }
  );

  let sqlAuthen = "INSERT INTO authen (AuthenID,email,password) VALUE(?,?,?)";
  connection.query(
    sqlAuthen,
    [req.body.userID, req.body.email, req.body.password],
    error => {
      if (error) throw error;
      // console.log(all);
    }
  );
});

//------------------------------------------------------------------------------------------------------------------------

//OLD ONE

// app.post("/trainer_dee/filter_by_service", (req, res) => {
//   let desiredFilters = [];
//   let sql = "";
//   if (req.body["yoga"] == 1) desiredFilters.push(0);
//   if (req.body["cardio"] == 1) desiredFilters.push(1);
//   if (req.body["weightTraining"] == 1) desiredFilters.push(2);

//   console.log(desiredFilters);

//   if (desiredFilters.length == 0) {
//     res.send([]);
//   } else if (desiredFilters.length == 1) {
//     console.log("Case filtered 1");
//     //sql = "select * from course c where c.Service = ?";
//     sql =
//       "SELECT c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,u.fName,u.sName,u.gender,u.telNo\
//       FROM course c, user u \
//       where c.service=? and c.TrainerId = u.userID;";

//     connection.query(sql, [desiredFilters[0]], (error, result) => {
//       if (error) throw error;

//       let all = JSON.parse(JSON.stringify(result));
//       res.send(all);
//       //console.log(all);
//     });
//   } else if (desiredFilters.length == 2) {
//     console.log("Case filtered 2");
//     //sql = "select * from course c where c.Service = ? or c.Service = ?";
//     sql =
//       "SELECT c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,u.fName,u.sName,u.gender,u.telNo\
//       FROM course c, user u \
//       where (c.service=? or c.service=?) and c.TrainerId = u.userID;";
//     connection.query(
//       sql,
//       [desiredFilters[0], desiredFilters[1]],
//       (error, result) => {
//         if (error) throw error;

//         let all = JSON.parse(JSON.stringify(result));
//         res.send(all);
//         //console.log(all);
//       }
//     );
//   } else if (desiredFilters.length == 3) {
//     console.log("Case filtered 3");
//     //sql = "select * from course c";
//     sql =
//       "SELECT c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,u.fName,u.sName,u.gender,u.telNo\
//       FROM course c, user u \
//       where c.TrainerId = u.userID;";

//     connection.query(sql, (error, result) => {
//       if (error) throw error;

//       let all = JSON.parse(JSON.stringify(result));
//       res.send(all);
//       //console.log(all);
//     });
//   }
// });

// app.post("/trainer_dee/filter_by_gender", (req, res) => {
//   let desiredFilters = [];
//   let sql = "";
//   if (req.body["male"] == 1) desiredFilters.push("M");
//   if (req.body["female"] == 1) desiredFilters.push("F");
//   if (req.body["others"] == 1) desiredFilters.push("O");

//   if (desiredFilters.length == 0) {
//     console.log("gender case 0");
//     res.send([]);
//   } else if (desiredFilters.length == 1) {
//     console.log("gender case 1");
//     let sql =
//       "Select  c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,u.fName,u.sName,u.gender,u.telNo\
//        FROM user u, trainer t, course c \
//        where u.userid = t.trainerid and t.trainerid = c.trainerid and u.Gender = ?";

//     connection.query(sql, [desiredFilters[0]], (error, result) => {
//       if (error) throw error;

//       let all = JSON.parse(JSON.stringify(result));
//       res.send(all);
//       //console.log(all);
//     });
//   } else if (desiredFilters.length == 2) {
//     console.log("gender case 2");

//     let sql =
//       "Select  c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,u.fName,u.sName,u.gender,u.telNo\
//        FROM user u, trainer t, course c \
//        where u.userid = t.trainerid and t.trainerid = c.trainerid and (u.Gender = ? or u.Gender = ?)";

//     connection.query(
//       sql,
//       [desiredFilters[0], desiredFilters[1]],
//       (error, result) => {
//         if (error) throw error;

//         let all = JSON.parse(JSON.stringify(result));
//         res.send(all);
//         console.log(all);
//       }
//     );
//   } else if (desiredFilters.length == 3) {
//     console.log("gender case 3");

//     let sql =
//       "Select  c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,u.fName,u.sName,u.gender,u.telNo\
//        FROM user u, trainer t, course c\
//         where u.userid = t.trainerid and t.trainerid = c.trainerid";

//     connection.query(sql, (error, result) => {
//       if (error) throw error;

//       let all = JSON.parse(JSON.stringify(result));
//       res.send(all);
//       console.log(all);
//     });
//   }
// });
app.listen(port, () => console.log(`Listening on port ${port}`));
