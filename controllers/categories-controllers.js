const Category = require('../models/category');




const getCategoriById = async (req, res, next) => {
    const categoryId = req.params.cid;
    let category;
    try {
        category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'No se pudo encontrar una categoría para el ID proporcionado' });
        };
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener la categoria' });
    }

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
    return res.status(201).json({ category: newCategory });
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
        const error = 'Algo salió mal, no se pudo actualizar la categoria';
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
