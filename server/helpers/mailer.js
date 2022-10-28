const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL
  }
});

const sendEmail = (recepient, subject = "No subject", mailContent = "", html = "") => {
  if (!recepient) throw "The function was not provided with an email !";
  let message = {
    from: process.env.USER_MAIL,
    to: recepient,
    subject,
    text: mailContent,
    html
  };

  transporter.sendMail(message, function(err) {
    if (err) throw err;
  });
}

module.exports = sendEmail; 
