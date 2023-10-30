const mongoose = require('mongoose');



const orderSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    product: [{type: mongoose.Types.ObjectId, required: false, ref: 'Product'}],
});



module.exports = mongoose.model('Order', orderSchema);
