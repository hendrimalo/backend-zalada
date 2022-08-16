const { Op } = require('sequelize');
const { Product } = require('../../models');

module.exports = async (req, res) => {
  const names = req.query.names || [];

  const sqlOPtions = {
    attributes: ['id', 'name', 'purchasePrice', 'sellingPrice', 'ImageUrl', 'userId'],
  };

  if (names.length) {
    sqlOPtions.where = {
      name: { [Op.substring]: names },
    };
  }

  const products = await Product.findAll(sqlOPtions);

  if (products.length === 0) {
    return res.status(200).json({
      status: 'success',
      data: 'data products not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: products,
  });
};
