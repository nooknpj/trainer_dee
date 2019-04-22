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

var setAcceptReEmailInfo = emailInfo => {
  //console.log("line 15 of mailsender", email,transactionID, token);
  // emailInfo.trainerEmail = email;
  // emailInfo.transactionID = transactionID;
  // emailInfo.token = token;
  let email = emailInfo.email;
  let transactionID = emailInfo.transactionID;
  let token = emailInfo.token;

  let mailSubject = `Your course "${emailInfo.cName}" has a new buy request.`;
  let mailContent = ` 
  
  <h  style="color: red"> Your course "${
    emailInfo.cName
  }" has a new buy request. </h>
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

  mailOptions["text"] = "";
  mailOptions["html"] = ` 
  <body>
  ${mailContent}
  <a href=http://localhost:${port}/trainer_dee/acceptBuyCourse/${transactionID}/${token}/>
  Accept Buy Request</a><br>\
  
  <a href=http://localhost:${port}/cancelBuyCourse/${transactionID}/${token}>Cancel Buy Request</a>
  </body>`;
  console.log("line 20 of mailsender", mailOptions);
};

var setComfirmReEmailInfo = (clientEmail, courseName) => {
  mailOptions["to"] = clientEmail;
  mailOptions["subject"] = `Your request to buy ${courseName} is Comfirm!`;
  mailOptions["text"] = `annouce your request to buy course is comfirm!`;
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
  console.log("sendMail line 41", mailOptions);

  transporter.sendMail(mailOptions, (error, res) => {
    console.log("sendMail line 44", mailOptions);
    if (error) {
      console.log(
        "-------------------error massage line 52 ----------------------"
      );
      console.dir(error);
      console.log(`Fail to send Email`);
      //return;
    } else {
      console.log(
        "---------------successful sending line 57------------------"
      );
      console.dir(res);
      console.log("sentMail line 59", mailOptions);
    }
  });
};

module.exports = { setAcceptReEmailInfo, sendingMail, setComfirmReEmailInfo };
