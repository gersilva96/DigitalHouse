// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Middlewares ************
const productValidation = require("../middlewares/productValidation");
const uploadImgProduct = require("../middlewares/uploadImgProduct");

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

router.get('/', productsController.root); /* GET - All products */
router.get('/detail/:productId/:productCategory', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create); /* GET - Form to create */
router.post('/create', uploadImgProduct.uploadFile, productValidation, productsController.store); /* POST - Store in DB */

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:productId', productsController.edit); /* GET - Form to create */
router.put('/edit/:productId', productValidation, productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:productId', productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;
