const Validator = require('fastest-validator');
const { Product, User } = require('../../models');

const v = new Validator();
module.exports = async (req, res) => {
  const schema = {
    name: 'string|empty:false|min:6|max:30',
    purchasePrice: 'number|empty:false|min:0',
    sellingPrice: 'number|empty:false|min:0',
    imageUrl: 'string|optional',
    userId: 'number|empty:false',
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  const product = await Product.findOne({
    where: { name: req.body.name },
  });

  if (product) {
    return res.status(409).json({
      status: 'error',
      message: `data product ${product.name} already exist`,
    });
  }

  const userCheck = await User.findOne({
    where: { id: req.body.userId },
  });

  if (!userCheck) {
    return res.status(409).json({
      status: 'error',
      message: `data user with id ${req.body.userId} not found`,
    });
  }

  const data = {
    name: req.body.name,
    purchasePrice: req.body.purchasePrice,
    sellingPrice: req.body.sellingPrice,
    imageUrl: `images/${req.file.filename}`,
    userId: req.body.userId,
  };

  const createdProduct = await Product.create(data);

  return res.status(200).json({
    status: 'success',
    message: `data product ${createdProduct.name} success created`,
  });
};
