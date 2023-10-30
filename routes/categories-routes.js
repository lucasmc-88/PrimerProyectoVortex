const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const categoryController = require('../controllers/categories-controllers');


//Rutas para traer las categorias

router.get("/:cid",categoryController.getCategoriById);

// Ruta para crear una nueva categoría
router.post('/', categoryController.createCategory);



module.exports = router;



