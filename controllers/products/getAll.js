const { Product } = require('../../models');

module.exports = async (req, res) => {
  const products = await Product.findAll();

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
