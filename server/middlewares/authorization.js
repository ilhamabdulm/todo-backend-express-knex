const { verifyToken } = require('../config/jwt.config');

const authorization = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      code: 403,
      message: 'Authorization Failed. Token is Missing.',
    });
  }

  token = token.split(' ');

  if (token[0] !== 'Bearer') {
    return res.status(403).json({
      code: 403,
      message: 'Authorization Failed. Invalid Token.',
    });
  }

  const user = verifyToken(token[1]);

  if (!user) {
    return res.status(403).json({
      code: 403,
      message: 'Authorization Failed. Invalid Token.',
    });
  }

  req.user = user;
  next();
};

module.exports = { authorization };
