const Validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const v = new Validator();
module.exports = async (req, res) => {
  const { id } = req.params;

  const schema = {
    username: 'string|empty:false|min:6|max:16',
    password: 'string|optional|min:6|max:24',
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `data user with id ${id} not found`,
    });
  }

  const checkUsername = await User.findOne({
    where: { username: req.body.username },
  });

  if (checkUsername) {
    return res.status(409).json({
      status: 'error',
      message: `data user ${user.username} is already exist`,
    });
  }

  const data = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
  };

  const updatedUser = await user.update(data);

  return res.status(200).json({
    status: 'success',
    message: `data user ${updatedUser.username} success updated`,
  });
};
