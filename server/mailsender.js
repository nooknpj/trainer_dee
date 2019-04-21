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

var setAcceptReEmailInfo = (email,transactionID,token) => {
  //console.log("line 15 of mailsender", email,transactionID, token);
  // emailInfo.trainerEmail = email;
  // emailInfo.transactionID = transactionID;
  // emailInfo.token = token;
  mailOptions["to"] = email;
  mailOptions["subject"] = `A Client want to buy your course!`
  mailOptions["text"] = ``;
  mailOptions["html"] = `<a href=http://localhost:${port}/trainer_dee/acceptBuyCourse/${transactionID}/${token}/>Accept reserve</a><br>\
  <a href=http://localhost:${port}/cancelBuyCourse/${transactionID}/${token}>Cancel reserve</a>`
  console.log("line 20 of mailsender",mailOptions);
  
};

var setComfirmReEmailInfo = (clientEmail,courseName)=>{
  mailOptions["to"] = clientEmail ;
  mailOptions["subject"] = `Your request to buy ${courseName} is Comfirm!`;
  mailOptions["text"] = `annouce your request to buy course is comfirm!`;
};


var mailOptions = {
  from: "d.plop4@gmail.com",
  to: "",
  subject: "",
  text: "" ,
  html : "",
    
};

var transporter = nodemailer.createTransport({
  service: "Gmail",
  secure : false,
  debug : true,
  auth: {
    user: "d.plop4@gmail.com",
    pass: "5931003221k"
  }
});


var sendingMail = () => {
 // console.log('mailserver sendmail line 42 port is >>>>',port);
console.log('sendMail line 41',mailOptions);

  transporter.sendMail(mailOptions, (error,res) => {
    console.log('sendMail line 44',mailOptions);
    if (error) {
      console.log('-------------------error massage line 52 ----------------------');
      console.dir(error)
      console.log(`Fail to send Email`);
      //return;
    } else {
    console.log('---------------successful sending line 57------------------')
    console.dir(res);
    console.log('sentMail line 59',mailOptions);
    
    }
  });
}

module.exports = { setAcceptReEmailInfo, sendingMail , setComfirmReEmailInfo };
