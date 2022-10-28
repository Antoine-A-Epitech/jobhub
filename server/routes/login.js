const express = require('express');
let router = express.Router();
const fetcher = require('../helpers/axiosInstance.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Check the user's info for login
router.post('/', async function(req, res, next) {
  let { email, password } = req.body;

  const serverErrStat = 500;

  // Checking if the user is registered
  let user;

  try {
    let { data } = await fetcher.get(`api/user/email/${email}`);
    if (!data.length) return res.status(403).send("Invalid Credentials");
    user = data[0];
  } catch (e) {
    console.log(e);
    return res.status(serverErrStat).send(`Server Error Status : ${serverErrStat}`);
  };

  // Checking if the passwords match
  try {
    if (await bcrypt.compare(password, user.password)) {
      // The user is authenticated
      const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      user.token = accessToken;

      let response = {
        token: user.token,
        user_id: user.user_id,
        admin_id: user.admin_id,
        is_recruter: user.is_recruter
      }

      return res.status(200).json(response); // Return the user information
    } else {
      return res.status(403).send('Invalid Credentials.');
    }
    } catch (e) {
      return res.status(serverErrStat).send(`Server Error Status : ${serverErrStat}`)
    }
  })

module.exports = router;
