const fs = require('fs-extra');
const path = require('path');
const { Product } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: `data product with ${id} not found`,
    });
  }

  fs.unlink(path.join(`public/${product.imageUrl}`));
  await product.destroy();

  return res.status(200).json({
    status: 'success',
    message: `data product with ${id} success deleted`,
  });
};
