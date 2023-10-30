const mongoose = require('mongoose');



const orderSchema = new Schema({
    date: { type: date, required: true },
    amount: { type: Number, required: true },
    products: [{type: mongoose.Types.ObjectId, required: false, ref: 'Product'}],
});



module.exports = mongoose.model('Order', orderSchema);