const mongoose = require('mongoose');

const walkInTransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false 
    },
    customerName: {
        type: String,
        required: true 
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true 
    },
    cashier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const WalkInTransaction = mongoose.model('WalkInTransaction', walkInTransactionSchema);

module.exports = WalkInTransaction;
