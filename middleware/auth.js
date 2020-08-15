const jwt = require('jsonwebtoken');
const config = require('config');

//customised auth middleware function
module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token'); //user supply username/password for the first time and server returns a access-token in header field 'x-auth-token'. For further sessions this token is exchanged, not the username/password.

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
