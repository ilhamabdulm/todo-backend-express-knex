const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  },
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log({ decoded });
      return { valid: true, expired: false, decoded };
    } catch (err) {
      return new Error({
        valid: false,
        expired: err.message.includes('jwt expired'),
        decoded: null,
      });
    }
  },
  decodeToken: (token) => {
    return jwt.decode(token, { complete: true });
  },
};
