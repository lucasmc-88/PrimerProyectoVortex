const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const orderController = require('../controllers/orders-controllers');


router.post('/', orderController.createOrder);

router.patch("/:oid", orderController.addProduct);

router.patch("/:oid/update-product/:pid", orderController.updateProductByOrder);


router.delete("/:oid/delete-product/:pid", orderController.deleteProductByOrder);

router.delete("/:oid", orderController.deleteOrder);

module.exports = router;