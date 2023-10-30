const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const orderController = require('../controllers/orders-controllers');


//Rutas para traer las categorias

//router.get("/:cid",orderController.getCategoriById);

// Ruta para crear una nueva categoría
//router.post('/', orderController.createCategory);



module.exports = router;
