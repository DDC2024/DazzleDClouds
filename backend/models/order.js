const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number, // Assuming total amount is a number
        required: true
    },
    totalPriceWithFee: {
        type: Number, // Assuming total price with fee is a number
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'delivered'],
        default: 'pending'
    },
    type: {
        type: String,
       enum:['E-commerce ','In-store'],
        default: "E-commerce "
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
