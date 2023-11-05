const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    products: [{
        productId:{type: mongoose.Types.ObjectId, required: false, ref: 'Product'},
        quantity: { type: Number, required: false},
    }],
    
    totalprice: { type: Number, required: false, validate: { validator: (v) => v >= 0, message: 'El precio total debe ser mayor o igual a 0.' } },
});

orderSchema.methods.calculateTotalPrice = function(order) {
    order.totalprice = order.products.reduce((sum, product) => sum + product.quantity * product.productId.price, 0);
};

module.exports = mongoose.model('Order', orderSchema);

