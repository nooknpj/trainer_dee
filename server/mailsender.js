// node mailer require
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const server = require("./server");
//

let emailInfo = {
  trainerEmail: "",
  token: "",
  transactionID : ""
};

var setReEmailInfo = email => {
  console.log("line 13 of mailsender", email);
  emailInfo.trainerEmail = email;
  emailInfo.token = crypto.randomBytes(10).toString("hex");
  mailOptions["to"] = email;
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
  transporter.sendMail(mailOptions, error => {
    if (error) {
      console.log(`Fail to send Email`);
    } else {
      console.log(`Send email to ${trainerEmail} Success`);
      return emailInfo;
    }
  });
};

module.exports = { setReEmailInfo, sendMail };
