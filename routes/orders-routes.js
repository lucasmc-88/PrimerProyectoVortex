const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const orderController = require('../controllers/orders-controllers');


//Rutas para traer las categorias

//router.get("/:cid",orderController.getCategoriById);

// Ruta para crear una nueva categoría
router.post('/', orderController.createOrder);

router.patch("/:oid", [
    check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("price").not().isEmpty(),
    ],
    orderController.addProduct
);

module.exports = router;
