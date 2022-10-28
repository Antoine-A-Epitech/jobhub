const express = require('express');
const jwt = require('jsonwebtoken');
let router = express.Router();
const fetcher = require('../helpers/axiosInstance.js');
const sendEmail = require('../helpers/mailer.js');
const { authenticateToken } = require('../helpers/auth.js');

router.post('/:id', authenticateToken, function(req, res, next) {
  const announcement_id = parseInt(req.params.id);

  fetcher.post(`/api/applications/${announcement_id}`, req.body).then(success => {
    fetcher.get(`/api/users/announcements/${announcement_id}`).then(success2 => {
      const recruterMail = success2.data[0].email
      const applicantMail = req.user.email;


      let recruterMessage = `You received a new application from :
      ${req.user.lastname.toUpperCase()} ${req.user.firstname}.
      Here's the application details :
      Phone Number : ${req.user.phone}
      Email : ${req.user.email}
      Message : ${req.user.message}`;
      let applicantMessage = `Your application has been sent !`;

      // Send the email to the recruter
      sendEmail(recruterMail, "New application", recruterMessage);

      // Send the email to the applicant
      sendEmail(applicantMail, "Your Application", applicantMessage);

      res.status(200).send('Application Sent !');
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
});

module.exports = router;
