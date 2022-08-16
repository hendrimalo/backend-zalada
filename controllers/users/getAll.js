const { User } = require('../../models');

module.exports = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'username'] });

  if (users.length === 0) {
    return res.status(200).json({
      status: 'success',
      data: 'data users not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: users,
  });
};
