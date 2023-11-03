
const Product = require('../models/product');




const getProduct = async (req, res, next) => {
    let products;
    try {

        products = await Product.find();
    } catch (error) {
        res.status(500).json({ error: "Error al listar los productos" });
    }


    if (!products.length) {
        res.status(404).json({ error: "No se encontraron productos" });
    }

    res.json({ products });
};

const getProductsByCategoryId = async (req, res, next) => {
    const categoryId = req.params.cid

    let products
    try {
        products = await Product.find({ categoryId });
        console.log(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar los productos por categoría' });
    }
    res.json(products);
}
const getProductById = async (req, res, next) => {
    const productId = req.params.pid;
    let product;
    try {
        product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'No se pudo encontrar el producto para el ID proporcionado' });
        };
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el producto' });
    }

    res.json({ product: product.toObject({ getters: true }) });
};

const createProduct = async (req, res, next) => {
    const { name, description, price, categoryId, stock } = req.body;

    const newProduct = new Product({
        name,
        description,
        price,
        categoryId,
        stock
    });
    try {

        await newProduct.save();
        res.status(201).json({ newProduct });
    } catch (error) {
        console.log(error + "mostrar el error");
        res.status(400).json({ error: 'Error al crear el producto' })
    }

};

const updateProduct = async (req, res, next) => {
    const { name, description, price, categoryId, stock } = req.body;
    const productId = req.body.id;

    const product = await Product.findOne({ id: productId });
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.categoryId = categoryId;
    product.stock = stock;

    try {
        await product.save();
    } catch (err) {
        const error = 'Algo salió mal, no se pudo actualizar el producto';
        return next(error);
    }

    res.status(200).json({ product: product.toObject({ getters: true }) });

};

const deleteProduct = async (req, res, next) => {
    const { productId } = req.params;

    const product = await Product.findOne({ _id: productId });

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    await Product.deleteOne({ _id: productId });

    res.status(200).json({ message: "Producto eliminado con exito" });
}

exports.getProduct = getProduct;
exports.getProductsByCategoryId = getProductsByCategoryId;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
