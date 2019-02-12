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
  let sql = "select * from course c where c.trainerid = ?";
  connection.query(sql, [trainerID], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    // console.log(all);
  });
});

app.post("/trainer_dee/edit_profile", (req, res) => {
  let sql =
    "UPDATE client \
  SET FName = ?, LName = ?, Gender = ?, TelNo = ?, Address = ? \
  WHERE clientId = ?";
  connection.query(
    sql,
    [firstName, lastName, gender, telNo, address, clientID],
    (error, result) => {
      if (error) throw error;
      // console.log(all);
    }
  );
});

app.post("/trainer_dee/upgrade_to_trainer", (req, res) => {
  let sql =
    "update client \
    set istrainer = 1 \
    where clientid = ?; \
    insert into trainer \
    (trainerid, trainerdescription, ssn, certificate, rating) \
    values (?, ?, ?, ?, ?);";
  connection.query(
    sql,
    [clientID, clientID, trainerDesc, SSN, certificate, -1],
    (error, result) => {
      if (error) throw error;
      // console.log(all);
    }
  );
});

// ------------------------------------------------------- ALREADY DONE -------------------------------------------------------

app.post("/trainer_dee/view_profile", (req, res) => {
  let sql = "select * from client cl where cl.clientId = ?";
  connection.query(sql, [req.body.clientid], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    // console.log(all);
  });
});

app.post("/trainer_dee/add_course", (req, res) => {
  let sql =
    "INSERT INTO Course \
(CName, Service, Cost, CourseHour, ImageUrl, CourseDescription, TrainerID) \
values (?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      req.body.courseName,
      req.body.service,
      req.body.price,
      req.body.courseHour,
      req.body.imageUrl,
      req.body.courseDescription
    ], //DON'T FORGET TO ADD TRAINER ID FROM LOGGED IN USER
    (error, result) => {
      if (error) throw error;
    }
  );
  sql =
    "INSERT INTO \
    Location(LocateCourseID, LName, lat, lng) \
    values ((select max(c.courseid) from course c), ?, ?, ?) ";
  connection.query(
    sql,
    [req.body.address, req.body.position.lat, req.body.position.lng],
    (error, result) => {
      if (error) throw error;
    }
  );
});

app.post("/trainer_dee/search_location", (req, res) => {
  let sql =
    "select c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,t.rating,cl.fName,cl.lName,cl.gender,cl.telNo \
  from trainer t, client cl, location l, course c \
  where l.locatecourseid = c.courseid and c.TrainerId = cl.clientID and cl.clientID=t.TrainerID and (l.lat BETWEEN ? - 0.0090909 AND ? + 0.0090909) and (l.lng between ? - 0.0090909 and ? + 0.0090909)";
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
    "SELECT c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,t.rating,cl.fName,cl.lName,cl.gender,cl.telNo \
  FROM course c, client cl, trainer t \
  where c.TrainerId = cl.clientID and cl.clientID=t.TrainerID";
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
    sql += " and cl.Gender != ?";
    filteredOutItem.push("M");
  }
  if (req.body.genderFilter["female"] == 0) {
    sql += " and cl.Gender != ?";
    filteredOutItem.push("F");
  }
  if (req.body.genderFilter["others"] == 0) {
    sql += " and cl.Gender != ?";
    filteredOutItem.push("O");
  }
  sql +=
    " and (c.cName like ? or c.courseDescription like ? or cl.fname like ? or cl.lname like ?)";
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

  let sql = "SELECT * FROM authen WHERE email = ? ";
  connection.query(sql, req.body["email"], (error, result) => {
    if (error) throw error;
    if (result.length !== 0) {
      res.sendStatus(450);
      return;
    }

    let sqlClient =
      "INSERT INTO client (clientID,FName,lName,gender,telNo,Address,isTrainer) VALUE(?,?,?,?,?,?,?)";
    connection.query(
      sqlClient,
      [
        req.body.clientID,
        req.body.fName,
        req.body.lName,
        req.body.gender,
        req.body.telNo,
        req.body.address,
        req.body.isTrainer
      ],
      error => {
        if (error) {
          console.log("error at insert into client");
          res.sendStatus(400);
          return;
        }
      }
    );

    let sqlAuthen = "INSERT INTO authen (AuthenID,email,password) VALUE(?,?,?)";
    connection.query(
      sqlAuthen,
      [req.body.clientID, req.body.email, req.body.password],
      error => {
        if (error) {
          console.log("error at second error");
          res.sendStatus(400);
        }
        console.log("backEndGoesHere");
        // res.sendStatus(200);
      }
    );
    console.log("backEndEndSuccessfully");
    res.sendStatus(200);
  });
});

app.post("/trainer_dee/insert_registeredTrainer", (req, res) => {
  let defaultRating = 0;
  // imgUrl and certificate not implement yet
  let sql =
    "INSERT INTO trainer (trainerID,ssn,trainerDescription,rating) VALUE(?,?,?,?) ";
  connection.query(
    sql,
    [
      req.body["clientID"],
      req.body["ssn"],
      req.body["trainerDescription"],
      defaultRating
    ],
    (error, result) => {
      if (error) res.sendStatus(400);

      console.log("added Trainer");
      res.sendStatus(200);
    }
  );
});

// login authentication
app.post("/trainer_dee/login_authentication", (req, res) => {
  let sql =
    "SELECT cl.clientID,cl.isTrainer,cl.fName FROM authen a,client cl WHERE a.authenID=cl.clientID && a.email = ? && a.password = ?   ";
  connection.query(
    sql,
    [req.body["email"], req.body["password"]],
    (error, result) => {
      if (error) throw error;
      if (result.length == 0) {
        console.log("Incorrect email or password");
        res.sendStatus(400);
        return;
      } else {
        let all = JSON.parse(JSON.stringify(result));
        console.log(all);
        res.send(all);

        return;
      }
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
