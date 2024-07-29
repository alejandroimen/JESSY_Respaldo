const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas');

router.post('/ML', ventasController.getVentasFromML);
router.get('/', ventasController.getAllVentas);
router.get('/:id', ventasController.getVentaByID)

 
module.exports = router;
