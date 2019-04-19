var mysql = require("mysql");
var http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const config = require("./config.js");
const mailsender = require("./mailsender.js");
//var isExist = false ;

app.use("/trainer_d_api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: "localhost",
  user: config.database.user,
  password: config.database.password,
  database: "trainer_dee",
  port: "3306",
  dateStrings: true
});

connection.connect();

// ---------------------------------------------------- DID NOT TEST YET ----------------------------------------------------

module.exports = { port };

app.post("/trainer_dee/")

app.post("/trainer_dee/create_transaction", (req, res) => {
  console.log(req.body);
  let sql = "SELECT * FROM transaction WHERE clientID=? AND courseID=?";
  let email = "";
  connection.query(
    sql,
    [req.body.clientID, req.body.courseID, "finished"],
    (error, result) => {
      if (error) throw error;

      if (result.length !== 0) {
        let createTransactionCondition =
          result[0].status == "finished" || result[0].status == "rejected";

        if (!createTransactionCondition) {
          console.log("alreadyExist");
          res.sendStatus(450);
          return;
        }
      }

      let sqlCreateTransaction =
        "INSERT INTO transaction (clientID,courseID,status) VALUE(?,?,?)";
      connection.query(
        sqlCreateTransaction,
        [req.body.clientID, req.body.courseID, req.body.status],
        error => {
          if (error) {
            console.log("error at insert into client");
            res.sendStatus(400);
            return;
          }
          sql = "SELECT email FROM Authen WHERE AuthenID = ?";
          connection.query(sql, [req.body.trainerID], (error, result) => {
            if (error) {
              console.log("error at select email from authen");
              return;
            }
            email = JSON.stringify(result[0].email); // get email from Authen table
            console.log("line71", email);
            console.log(email);
            mailsender.setReEmailInfo(email);
            mailsender.sendMail();
          });
        }
      );

      // sql = "INSERT INTO verifyEmail(verifyID,token) VALUES (?,?)"
      // connection.query(sql ,[req.body.clientID,emailInfo.token],(error)=>{
      //   if(error){
      //     console.log("error to insert into verifyEmail Table");
      //   }
      // });
      console.log("backEndEndSuccessfully");
      res.sendStatus(200);
    }
  );
});
app.post("/trainer_dee/acceptCourse");
// ------------------------------------------------------- ALREADY DONE -------------------------------------------------------

app.post("/trainer_dee/get_courses_client", (req, res) => {
  let sql =
    "select cl.fName, cl.lName, cl.telNo from client cl, transaction t \
  where t.clientID = cl.clientID and t.courseID = ?";
  connection.query(sql, [req.body.courseID], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    // console.log(all);
  });
});

app.post("/trainer_dee/view_created_course", (req, res) => {
  let sql = "select * from course c where c.trainerid = ?";
  connection.query(sql, [req.body.trainerID], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result)); //change to string
    res.send(all);
    // console.log(all);
  });
});

app.post("/trainer_dee/view_attended_course", (req, res) => {
  let sql =
    "SELECT ts.clientID, t.trainerID, cl.fName, cl.lName, c.courseID, c.cName, c.service, c.courseDescription, c.cost, c.courseHour, cl.gender, c.imageUrl, t.rating, ts.status \
  FROM client cl,transaction ts,course c,trainer t \
  WHERE ts.clientID = cl.clientID AND ts.courseID = c.courseID AND c.trainerID = t.trainerID \
  AND cl.clientID = ?;";
  connection.query(sql, [req.body.clientID], (error, result) => {
    if (error) throw error;
    let sql2 =
      "select cl.fName, cl.lName from trainer t, client cl \
    where t.trainerID = cl.clientID and t.trainerID = ?";
    let all = JSON.parse(JSON.stringify(result)); //change to string
    connection.query(sql2, all[0].trainerID, (error2, result2) => {
      //query again to get trainer name, not client name
      if (error) throw error;
      // console.log(result2);
      let all2 = JSON.parse(JSON.stringify(result2));
      all[0].fName = all2[0].fName;
      all[0].lName = all2[0].lName;
      res.send(all);
    });

    // console.log(all);
  });
});

app.post("/trainer_dee/get_course_description", (req, res) => {
  let sql =
    "SELECT c.courseID, c.trainerID, c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,l.lname as locName,l.lat,l.lng,t.rating,cl.fName,cl.lName,cl.gender,cl.telNo \
    FROM course c, client cl, trainer t , location l \
    where c.TrainerID = cl.clientID and cl.clientID=t.TrainerID and l.locatecourseID = c.courseID and c.courseID = ?";
  connection.query(sql, [req.body.courseID], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    console.log(all);
  });
});

app.post("/trainer_dee/edit_profile", (req, res) => {
  let sql =
    "UPDATE client \
  SET FName = ?, LName = ?, Gender = ?, Address = ?, TelNo = ? \
  WHERE clientId = ?";
  connection.query(
    sql,
    [
      req.body.firstName,
      req.body.lastName,
      req.body.gender,
      req.body.address,
      req.body.telNo,
      req.body.clientID
    ],
    (error, result) => {
      if (error) throw error;
      // console.log(all);
      res.end();
    }
  );
});

app.post("/trainer_dee/edit_trainer_profile", (req, res) => {
  let sql =
    "UPDATE trainer \
  SET trainerDescription = ?, trainerImg = ? \
  WHERE trainerId = ?";
  console.log(req.body.trainerDescription);
  connection.query(
    sql,
    [req.body.trainerDescription, req.body.trainerImg, req.body.clientID],
    (error, result) => {
      if (error) throw error;
      // console.log(all);
      res.end();
    }
  );
});

app.post("/trainer_dee/upgrade_to_trainer", (req, res) => {
  let sql =
    "update client \
    set istrainer = 1 \
    where clientid = ? \
    ";
  connection.query(sql, [req.body.clientID], (error, result) => {
    if (error) throw error;
    // console.log(all);
  });
  sql =
    "insert into trainer \
  (trainerid, trainerdescription, ssn, trainerImg, rating) \
  values (?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      req.body.clientID,
      req.body.trainerDesc,
      req.body.ssn,
      req.body.trainerImg,
      0
    ],
    (error, result) => {
      if (error) throw error;
      // console.log(all);
      res.end();
    }
  );
});

app.post("/trainer_dee/view_profile", (req, res) => {
  let sql =
    "select cl.ClientID,cl.FName,cl.LName,cl.Gender,cl.TelNo,cl.Address,cl.isTrainer,a.Email from client cl,authen a  where a.authenID=cl.clientID && cl.clientId = ?";
  connection.query(sql, [req.body.clientID], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    console.log(all);
  });
});

app.post("/trainer_dee/view_trainer_profile", (req, res) => {
  let sql =
    "select t.Ssn,t.TrainerDescription,t.Rating,t.TrainerImg from trainer t  where t.trainerID = ?";
  connection.query(sql, [req.body.trainerID], (error, result) => {
    if (error) throw error;

    let all = JSON.parse(JSON.stringify(result));
    res.send(all);
    console.log(all);
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
      req.body.courseDescription,
      req.body.clientID
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
    "SELECT c.courseID,c.cName,c.service,c.courseHour,c.cost,c.imageUrl,c.courseDescription,t.rating,cl.fName,cl.lName,cl.gender,cl.telNo \
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
    "INSERT INTO trainer (trainerID,ssn,trainerDescription,trainerImg,rating) VALUE(?,?,?,?,?) ";
  connection.query(
    sql,
    [
      req.body["clientID"],
      req.body["ssn"],
      req.body["trainerDescription"],
      req.body["trainerImg"],
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
