const express = require('express');
const productsController = require('../controllers/products');
const verifyToken = require('../utils/verifyToken');
const { uploadSingle } = require('../middlewares/multer');

const router = express.Router();

/* ENDPOINT PRODUCTS. */
router.get('/', productsController.getAll);
router.post('/', [verifyToken, uploadSingle], productsController.create);
router.get('/:id', productsController.getById);
router.put('/:id', [verifyToken, uploadSingle], productsController.updateByid);
router.delete('/:id', verifyToken, productsController.deleteByid);

module.exports = router;
