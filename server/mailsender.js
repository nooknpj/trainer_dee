// node mailer require
const nodemailer = require("nodemailer");
const crypto = require("crypto");
//const server = require("./server");
//


let emailInfo  =  {
        trainerEmail : '',
        token : ''
    }


var setReEmailInfo = (email)=>{
    emailInfo.trainerEmail = email;
    emailInfo.token = crypto.randomBytes(10).toString('hex');
};

var transporter = nodemailer.createTransport({
    service: 'gmail' ,
    port : 340 ,
    auth : {
        user : 'd.plop4@gmail.com',
        pass : '5931003221k'
    }
});

var mailOptions = {
    from : 'd.plop4@gmail.com',
    to : emailInfo.trainerEmail ,
    subject : 'New reserve request is Waiting!!',
    text : `[url=http://localhost/acceptBuyCourse/${emailInfo.token}/]Accept reserve[/url]<br>\
    [url=http://localhost/cancelBuyCourse/]Cancel reserve[/url]` ,
};
var sendMail = () =>{
    transporter.sendMail(mailOptions ,(error)=>{
        if(error) {
          console.log(`Fail to send Email`);  
        } 
        else {
            console.log(`Send email to ${trainerEmail} Success`);
            return emailInfo;
        }
    });
    
}


module.exports = {setReEmailInfo , sendMail}; 