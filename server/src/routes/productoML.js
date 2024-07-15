const express = require('express');
const router = express.Router();
const productosController = require('../controllers/app');

router.post('/', productosController.createProduct);
router.get('/:id', productosController.getProduct);
router.put('/:id', productosController.updateProduct);
router.delete('/:id', productosController.deleteProduct);

module.exports = router;

