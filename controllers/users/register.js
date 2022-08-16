const Validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const v = new Validator();
module.exports = async (req, res) => {
  const schema = {
    username: 'string|empty:false|min:6|max:16',
    password: 'string|empty:false|min:6|max:24',
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  const user = await User.findOne({
    where: { username: req.body.username },
  });

  if (user) {
    return res.status(409).json({
      status: 'error',
      message: `data user ${user.username} already exist`,
    });
  }

  const data = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
  };

  const createdUser = await User.create(data);

  return res.status(200).json({
    status: 'success',
    message: `data user ${createdUser.username} success created`,
  });
};
