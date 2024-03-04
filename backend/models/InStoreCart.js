const mongoose = require('mongoose');

const inStoreCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
 
});

module.exports = mongoose.model('InStoreCartItem', inStoreCartSchema);
