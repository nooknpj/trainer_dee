// node mailer require
const nodemailer = require("nodemailer");
//const crypto = require("crypto");
const port = 5000 || process.env.PORT;

//

emailInfo = {
  trainerEmail: "",
  token : "",
  transactionID : ""
};

var setReEmailInfo = (email,transactionID,token) => {
  //console.log("line 15 of mailsender", email,transactionID, token);
  emailInfo.trainerEmail = email;
  emailInfo.transactionID = transactionID;
  emailInfo.token = token;
  mailOptions["to"] = email;
  mailOptions["text"] = `[url=http://localhost:${port}/trainer_dee/acceptBuyCourse/${token}/]Accept reserve[/url]<br>\
  [url=http://localhost:${port}/cancelBuyCourse/${token}]Cancel reserve[/url]`
  console.log("line 20 of mailsender",mailOptions);
  
};
// try------------------------------
var transporter = nodemailer.createTransport({
  host : "smtp.ethereal.email",
  port : 587 ,
  secure : false ,
  auth : {
    user : "d.plop4@gmail.com",
    pass : "5931003221k"
  }
})
var mailOptions = {
  from: "d.plop4@gmail.com",
  to: "",
  subject: "New reserve request is Waiting!!",
  text: ""
}

  var sendingMail = () => {
    // console.log('mailserver sendmail line 42 port is >>>>',port);
   console.log('sendMail line 41',emailInfo.token,mailOptions);
   
     transporter.sendMail(mailOptions, error => {
       console.log('sendMail line 44',emailInfo,mailOptions);
       if (error) {
         console.log(`Fail to send Email`);
         //return;
       } 
       
       console.log('sentMail line 48',emailInfo,mailOptions);
       return emailInfo;
       //  else {
       //   console.log(`Send email to ${trainerEmail} Success`);
       //   return emailInfo;
       // }
     });
   }; 

//end try ------------------------------
// var mailOptions = {
//   from: "d.plop4@gmail.com",
//   to: "",
//   subject: "New reserve request is Waiting!!",
//   text: ""
    
// };

// var transporter = nodemailer.createTransport({
//   service: "Gmail",
//   secure : false,
//   debug : true,
//   auth: {
//     user: "d.plop4@gmail.com",
//     pass: "5931003221k"
//   }
// });


// var sendMail = () => {
//  // console.log('mailserver sendmail line 42 port is >>>>',port);
// console.log('sendMail line 41',emailInfo.token,mailOptions);

  transporter.sendMail(mailOptions, (error,res) => {
    console.log('sendMail line 44',emailInfo,mailOptions);
    if (error) {
      console.dir(error)
      console.log(`Fail to send Email`);
      //return;
    } else {
    console.dir(res);
    console.log('sentMail line 48',emailInfo,mailOptions);
    return emailInfo;
    //  else {
    //   console.log(`Send email to ${trainerEmail} Success`);
    //   return emailInfo;
    }
  });

module.exports = { setReEmailInfo, sendingMail };
