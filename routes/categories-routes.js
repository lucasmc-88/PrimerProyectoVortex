const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const categoryController = require('../controllers/categories-controllers');


//Rutas para traer las categorias

router.get("/:cid",categoryController.getCategoriById);

// Ruta para crear una nueva categoría


router.post('/', [
    check("name").not().isEmpty()
],
categoryController.createCategory);

//Rutas para modificar

router.patch(
    "/:cid",
    [check("name").not().isEmpty()],
    categoryController.updateCategory
);

router.delete("/:pid", categoryController.deleteCategory);

module.exports = router;



