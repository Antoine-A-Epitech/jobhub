const express = require('express');
const fetcher = require('../helpers/axiosInstance.js');
const bcrypt = require('bcrypt');
let router = express.Router();

router.post('/', async function(req, res, next) {

  // Checking if the email already exists in the database
  try {
    let { data } = await fetcher(`/api/user/email/${req.body.email}`);
    if (data.length) return res.status(405).send("This email is already in use.");
  } catch (e) {
    return res.status(500).send("Server Error");
  }

  let { password, is_recruter } = req.body;

  // Checking is the user is a recruter
  req.body.is_recruter = req.body.is_recruter ? true : false;

  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    fetcher.post('/api/users', req.body).then(success => {
      return res.status(201).json('User Added !');
    }).catch(e => {
      throw e
    })
  } catch (e) {
    return res.status(500).send("Server Error");
  }
})

module.exports = router;
