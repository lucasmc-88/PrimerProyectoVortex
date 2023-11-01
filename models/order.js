const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    products: [{
        product:{type: mongoose.Types.ObjectId, required: false, ref: 'Product'},
        description: { type: String, required: true },
        price: { type: Number, required: true },
    }],
    totalprice: { type: Number, required: true, validate: { validator: (v) => v >= 0, message: 'El precio total debe ser mayor o igual a 0.' } },
});

orderSchema.methods.calculateTotalPrice = function() {
    this.totalprice = this.products.reduce((sum, product) => sum + product.price, 0);
};

module.exports = mongoose.model('Order', orderSchema);

