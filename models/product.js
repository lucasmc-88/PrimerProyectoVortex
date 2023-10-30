const mongoose = require('mongoose');



const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: [{type: mongoose.Types.ObjectId, required: false, ref: 'Category'}],
});



module.exports = mongoose.model('Product', productSchema);



