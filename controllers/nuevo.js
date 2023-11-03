/*const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    products: [{
        product:{type: mongoose.Types.ObjectId, required: false, ref: 'Product'},
        description: { type: String, required: false },
        price: { type: Number, required: false },
    }],
    totalprice: { type: Number, required: false, validate: { validator: (v) => v >= 0, message: 'El precio total debe ser mayor o igual a 0.' } },
});

orderSchema.methods.calculateTotalPrice = function() {
    this.totalprice = this.products.reduce((sum, product) => sum + product.price, 0);
};

module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: [{type: mongoose.Types.ObjectId, required: false, ref: 'Category'}],
    stock: { type: Number, required: true },
});



module.exports = mongoose.model('Product', productSchema);


Orden de compra

Crear entidad para coleccionar productos en un formato de orden de compra o carrito de
compra, la misma deberia coleccionar los productos pudiendo indicar la cantidad de items y
el precio total de la compra.
Endpoints a generar
Crear carrito
Agregar producto
Update producto
Borrar producto
Borrar carrito

arma todo eso con los modelos que te paso*/