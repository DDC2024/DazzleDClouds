const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
        default:"This is an example of product description"
    },
    price: {
        type: Number,
        required: false
    },
    wholesaleprice: {
        type: Number, // Adding wholesaleprice field
        required: false
    },
    category: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    photoUrl: {
        type: String // Store the URL of the image
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
