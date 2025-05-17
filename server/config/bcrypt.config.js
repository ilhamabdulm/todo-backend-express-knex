const bcrypt = require('bcryptjs');

const hashPassword = (plainPassword) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
};

const comparePassword = (plainPassword, password) => {
  return bcrypt.compareSync(plainPassword, password);
};

module.exports = {
  hashPassword,
  comparePassword,
};
