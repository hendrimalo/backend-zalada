const Validator = require('fastest-validator');
const { Product } = require('../../models');

const v = new Validator();
module.exports = async (req, res) => {
  const { id } = req.params;

  const schema = {
    name: 'string|optional|min:6|max:30',
    purchasePrice: 'number|optional|min:0',
    sellingPrice: 'number|optional|min:0',
    imageUrl: 'string|optional',
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: `data product with id ${id} not found`,
    });
  }

  const checkName = await Product.findOne({
    where: { name: req.body.name },
  });

  if (checkName) {
    return res.status(409).json({
      status: 'error',
      message: `data product ${product.name} is already exist`,
    });
  }

  const data = {
    name: req.body.name,
    purchasePrice: req.body.purchasePrice,
    sellingPrice: req.body.sellingPrice,
    imageUrl: req.body.imageUrl,
  };

  const updatedProduct = await product.update(data);

  return res.status(200).json({
    status: 'success',
    message: `data product ${updatedProduct.name} success updated`,
  });
};
