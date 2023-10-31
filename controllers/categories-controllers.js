const Category = require('../models/category');
const fs = require('fs');
const { validationResult } = require('express-validator');
const category = require('../models/category');



const getCategoriById = async (req, res, next) => {
    const categoryId = req.params.cid;
    let category;
    try {
        category = await Category.findById(categoryId);
    } catch (err) {
        console.log(
            "Algo salió mal, no pude encontrar la categoría."
        );
        return next("Algo salió mal, no pude encontrar la categoría.");
    }

    if (!category) {
        const error = "No se pudo encontrar una categoría para el ID proporcionado."
        return next(error);
    };

    res.json({ category: category.toObject({ getters: true }) });
};

const createCategory = async (req, res, next) => {
    const { name } = req.body;

    const newCategory = new Category({
        name
    });
console.log(newCategory);
    try {
        await newCategory.save();
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
    res.status(201).json({ category: newCategory });
};

const updateCategory = async (req, res, next) => {
     const { name } = req.body;
    const categoryId = req.params.cid;

    // Verificamos que el id de la categoría exista.
    const category = await Category.findOne({ _id: categoryId });
console.log(category);
    if (!category) {
        // El id de la categoría no existe.
        return res.status(404).json({ message: "Categoría no encontrada." });
    }

    
    category.name = name;

    try {
        await category.save();
    } catch (err) {
        const error = 'Algo salió mal, no se pudo actualizar el lugar';
        return next(error);
    }

    // Devuelve la categoría actualizada.
    res.status(200).json({ category: category.toObject({ getters: true }) });

};

const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params;

    // Verificamos que el id de la categoría exista.
    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
        // El id de la categoría no existe.
        return res.status(404).json({ message: "Categoría no encontrada." });
    }

    // Eliminamos la categoría.
    await Category.deleteOne({ _id: categoryId });

    // Devolvemos un mensaje de éxito.
    res.status(200).json({ message: "Categoría eliminada con éxito." });
};
exports.getCategoriById = getCategoriById;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
