const _ = require('lodash');

const users = require('../repositories/user.repository');
const { addErrorReporting } = require('../utils/helper');
const { comparePassword, hashPassword } = require('../config/bcrypt.config');
const { generateToken } = require('../config/jwt.config');

async function postRegisterUser(req, res) {
  let body = req.body;
  const passwordHash = hashPassword(body.password);

  body['password'] = passwordHash;
  
  const created = await users.create(body);
  return res.status(201).json({ message: 'success', data: created });
}

async function postLoginUser(req, res) {
  const body = req.body;
  const userExist = await users.getByEmail(body.email);

  if (!userExist) {
    return res.status(400).json({ message: 'User Doesnt Exist' });
  }

  const isPasswordValid = comparePassword(body.password, userExist.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Password is wrong' });
  }

  const token = generateToken(userExist.id);

  return res.status(200).json({
    message: 'success login',
    data: {
      access_token: token,
      user_id: userExist.id,
    },
  });
}

module.exports = {
  postRegisterUser: addErrorReporting(
    postRegisterUser,
    'Failed to create user'
  ),
  postLoginUser: addErrorReporting(postLoginUser, 'Failed to login user'),
};
