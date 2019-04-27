// node mailer require
const nodemailer = require("nodemailer");
//const crypto = require("crypto");
const port = 5000 || process.env.PORT;

//

// emailInfo = {
//   trainerEmail: "",
//   token : "",
//   transactionID : ""
// };

var getService = service => {
  if (service == 0) return "Yoga";
  if (service == 1) return "Cardio";
  if (service == 2) return "WeightTraining";
  else return "others";
};

var setAcceptReEmailInfo = emailInfo => {
  //console.log("line 15 of mailsender", email,transactionID, token);
  // emailInfo.trainerEmail = email;
  // emailInfo.transactionID = transactionID;
  // emailInfo.token = token;
  let email = emailInfo.email;
  let transactionID = emailInfo.transactionID;
  let token = emailInfo.token;

  let mailSubject = `Your course "${
    emailInfo.cName
  }" has a new buy request. Transaction ID: ${transactionID}.`;
  let mailContent = ` 
  
  <p > Your course "${emailInfo.cName}" has a new buy request. </p>
  <p>Transaction ID: ${transactionID}</p>
                    <hr>
                    <p> Course Name: ${emailInfo.cName} </p> 
                    <p> Course Service: ${emailInfo.service}  </p>
                    <p> Course Cost: ${emailInfo.courseCost} Baht </p>
                    <p> Course Duration: ${emailInfo.courseHour} Hours </p>
                    <hr>
                    
                    <p> Client Name: ${emailInfo.clientFName} ${
    emailInfo.clientLName
  } </p> 
                    <p> Client TelNo: ${emailInfo.clientTelno}  </p>
                    <p> Client Email: ${emailInfo.clientEmail}  </p>
                    <hr>
                    <p> Please accept or cancel buy request within 48 hours.</p>
                     `;
  console.log(emailInfo);
  mailOptions["to"] = email;
  // mailOptions["subject"] = `A Client want to buy your course2!`;
  mailOptions["subject"] = mailSubject;

  mailOptions["text"] = `transactionID: ${transactionID}`;
  mailOptions["html"] = ` 
  <body>
  ${mailContent}
  <a href=http://35.247.170.167:3000/acceptBuyCourse/${transactionID}/${token}/>
  Accept Buy Request</a><br>\
  
  <a href=http://35.247.170.167:3000/cancelBuyCourse/${transactionID}/${token}>Cancel Buy Request</a>
  </body>`;
  console.log("line 20 of mailsender", mailOptions);
};

var setComfirmReEmailInfo = emailInfo => {
  let mailContent = `<p > Your request to buy course "${
    emailInfo.cName
  }" has been accepted. </p>
  <p>Transaction ID: ${emailInfo.transactionID}</p>
                    <hr>
                    <p> Course Name: ${emailInfo.cName} </p> 
                    <p> Course Service: ${getService(emailInfo.service)}  </p>
                    <p> Course Cost: ${emailInfo.courseCost} Baht </p>
                    <p> Course Duration: ${emailInfo.courseHour} Hours </p>
                    <hr>
                    
                    <p> Trainer Name: ${emailInfo.trainerFName} ${
    emailInfo.trainerLName
  } </p> 
                    <p> Trainer TelNo: ${emailInfo.trainerTelno}  </p>
                    <p> Trainer Email: ${emailInfo.trainerEmail}  </p>
                    <hr>
                    <p> Please pay for the course within 48 hours.</p>`;
  mailOptions["to"] = emailInfo.clientEmail;
  mailOptions["subject"] = `Your request to buy ${
    emailInfo.cName
  } is accepted! Transaction ID: ${emailInfo.transactionID}`;
  mailOptions["text"] = ``;
  mailOptions["html"] = ` 
  <body>
  ${mailContent}
  <a href=http://35.247.170.167:3000/myCourse>
  View My Course</a><br>`;
};

var setRejected = emailInfo => {
  let mailContent = `<p > Sorry, your request to buy course "${
    emailInfo.cName
  }" has been rejected. </p>
  <p>Transaction ID: ${emailInfo.transactionID}</p>
                    <hr>
                    <p> Course Name: ${emailInfo.cName} </p> 
                    <p> Course Service: ${getService(emailInfo.service)}  </p>
                    <p> Course Cost: ${emailInfo.courseCost} Baht </p>
                    <p> Course Duration: ${emailInfo.courseHour} Hours </p>
                    <hr>
                    
                    <p> Trainer Name: ${emailInfo.trainerFName} ${
    emailInfo.trainerLName
  } </p> 
                    <p> Trainer TelNo: ${emailInfo.trainerTelno}  </p>
                    <p> Trainer Email: ${emailInfo.trainerEmail}  </p>
                    <hr>
              `;
  mailOptions["to"] = emailInfo.clientEmail;
  mailOptions["subject"] = `Sorry,your request to buy ${
    emailInfo.cName
  } is rejected. Transaction ID: ${emailInfo.transactionID}`;
  mailOptions["text"] = ``;
  mailOptions["html"] = ` 
  <body>
  ${mailContent}
  <a href=http://35.247.170.167:3000/searchCourse>
  Look for other courses</a><br>`;
};

var mailOptions = {
  from: "d.plop4@gmail.com",
  to: "",
  subject: "",
  text: "",
  html: ""
};

var transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: false,
  debug: true,
  auth: {
    user: "d.plop4@gmail.com",
    pass: "5931003221k"
  }
});

var sendingMail = () => {
  // console.log('mailserver sendmail line 42 port is >>>>',port);
  // console.log("sendMail line 41", mailOptions);

  transporter.sendMail(mailOptions, (error, res) => {
    // console.log("sendMail line 44", mailOptions);
    if (error) {
      // console.log(
      //   "-------------------error massage line 52 ----------------------"
      // );
      // console.dir(error);
      // console.log(`Fail to send Email`);
      // //return;
    } else {
      // console.log(
      //   "---------------successful sending line 57------------------"
      // );
      // console.dir(res);
      // console.log("sentMail line 59", mailOptions);
    }
  });
};

module.exports = {
  setAcceptReEmailInfo,
  sendingMail,
  setComfirmReEmailInfo,
  setRejected
};
