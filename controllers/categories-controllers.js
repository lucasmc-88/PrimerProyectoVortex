const cat = [
   { id: 'c1',
    name:'prueba de cat'
}

]

const Category = require('../models/category');
const Product = require('../models/product');



const getCategoriById = async (req, res, next) => {
    const categoryId = req.params.cid;
    let category;
    try {
        category = await Category.findById(categoryId);
    } catch (err) {
        console.log(
            "Something went wrong, I couldn't find the category."
        );
        return next("Something went wrong, I couldn't find the category.");
    }

    if (!category) {
        const error = "Could not find a category for the provided ID.."
        return next(error);
    };

    res.json({ category: category.toObject({ getters: true }) });
};

const createCategory = async (req, res, next) => {
    const { id, name } = req.body;

    const newCategory = new Category({
        id,
        name,
    });

    try {
        await newCategory.save();
    } catch (err) {
        const error = 'Creación de categoría fallida, por favor inténtelo de nuevo.';
        return next(error);
    }

    res.status(201).json({ category: newCategory });
};

exports.getCategoriById = getCategoriById;
exports.createCategory = createCategory;