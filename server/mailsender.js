// node mailer require
const nodemailer = require("nodemailer");
//

let trainerEmail = '';

var setReEmail = (email)=>{
    trainerEmail = email ;
};

var transporter = nodemailer.createTransport({
    service: 'gmail' ,
    auth : {
        user : 'd.plop4@gmail.com',
        pass : '5931003221k'
    }
});

var mailOption = {
    from : 'd.plop4@gmail.com',
    to : trainerEmail ,
    subject : 'New reserve request is Waiting!!',
    text : 'D PLOP '
};
var sendMail = () =>{
    transporter.sendMail(mailOptions ,(error,info)=>{
        if(error) throw error ;
        else console.log(`Send email to ${trainerEmail}`);
    });
}


module.exports = {setReEmail , sendMail}; 