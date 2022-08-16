const { Product } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: `data product with id ${id} not found`,
    });
  }

  return res.status(200).json({
    status: 'success',
    data: product,
  });
};
