const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send('No token, authorization denied.');
  }

  const token = authHeader.replace('Bearer ', '');
  console.log("Token to verify:", token); // Debug statement
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Token is not valid.');
    }
    req.user = user;
    console.log("Decoded JWT:", user);
    next();
  });
}


module.exports = authenticateJWT;
