const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return next(new Error('No token, authorization denied'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    next(new Error('Token is not valid'));
  }
};

module.exports = verifyJWT;
