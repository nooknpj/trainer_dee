// node mailer require
const nodemailer = require("nodemailer");
//const crypto = require("crypto");
const server = require("./server");

//

var emailInfo = {
  trainerEmail: "",
  token: "",
  transactionID : ""
};

var setReEmailInfo = (email,transactionID,token) => {
  //console.log("line 15 of mailsender", email,transactionID, token);
  emailInfo.trainerEmail = email;
  emailInfo.transactionID = transactionID;
  emailInfo.token = token;
  mailOptions["to"] = email;
  console.log("line 20 of mailsender", email,transactionID, token);
};

var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 340,
  auth: {
    user: "d.plop4@gmail.com",
    pass: "5931003221k"
  }
});

var mailOptions = {
  from: "d.plop4@gmail.com",
  to: "d.plop4@gmail.com",
  subject: "New reserve request is Waiting!!",
  text: `[url=http://localhost:${server.port}/trainer_dee/acceptBuyCourse/${emailInfo.token}/]Accept reserve[/url]<br>\
    [url=http://localhost:${server.port}/cancelBuyCourse/${emailInfo.token}]Cancel reserve[/url]`
    
};
var sendMail = () => {
console.log('sendMail line 41',emailInfo,mailOptions)
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(`Fail to send Email`);
      return;
    }
    
    console.log(emailInfo,mailOptions);
    return emailInfo;
    //  else {
    //   console.log(`Send email to ${trainerEmail} Success`);
    //   return emailInfo;
    // }
  });
};

module.exports = { setReEmailInfo, sendMail };
