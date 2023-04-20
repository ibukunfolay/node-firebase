const express = require('express');

const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.post('/new', createProduct);
router.get('/product/:id', getProduct);
router.post('/update/:id', updateProduct);
router.post('/delete/:id', deleteProduct);

module.exports = router;
