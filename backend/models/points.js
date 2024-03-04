const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    pointsEarned: {
        type: Number, // Allow decimal values
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Points = mongoose.model('Points', pointsSchema);

module.exports = Points;
