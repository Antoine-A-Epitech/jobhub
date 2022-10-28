const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.renderStatus(401);
  }

  try {
    const userData = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = userData;
    next();
  } catch (e) {
    return res.sendStatus(403);
  }
}

module.exports = { authenticateToken };
