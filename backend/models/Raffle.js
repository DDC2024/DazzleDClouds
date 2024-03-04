const mongoose = require('mongoose');

const raffleSchema = new mongoose.Schema({
  start_date: {
    type: Date,
    required: false
  },
  end_date: {
    type: Date,
    required: false,
    default: null
  },
  entry_fee: {
    type: Number,
    required: false
  },
  total_entries_needed: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed'],
    default: 'pending'
  },
  prize1_product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  prize2_product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  prize3_product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  winner1_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  winner2_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  winner3_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  entry_date: {
    type: Date,
    default: Date.now
  },
  participants: [String] // Array of participant usernames or IDs
});

const Raffle = mongoose.model('Raffle', raffleSchema);

module.exports = Raffle;
