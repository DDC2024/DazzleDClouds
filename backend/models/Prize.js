const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

const Prize = mongoose.model('Prize', prizeSchema);

module.exports = Prize;
