const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateAdminToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const userData = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!userData.admin_id) return res.sendStatus(403);
    req.user = userData;
    next();
  } catch (e) {
    return res.sendStatus(403);
  }
}

module.exports = { authenticateAdminToken };
