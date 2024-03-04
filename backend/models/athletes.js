const mongoose = require('mongoose');

const AthleteSchema = new mongoose.Schema({
  visaCategory: {
    type: String,
    required: false,
  },
  emiratesId: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  addressInUAE: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  poBox: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  athleteWeight: {
    type: Number,
    required: false,
  },
  clubStable: {
    type: String,
    required: false,
  },
  discipline: {
    type: String,
    required: false,
  },
  athleteContact: {
    type: String,
    required: false,
  },
  passport: {
    issueDate: {
      type: Date,
      required: false,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
    file: {
      data: Buffer,
      contentType: String,
    },
  },
  nationalId: {
    issueDate: {
      type: Date,
      required: false,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
    file: {
      data: Buffer,
      contentType: String,
    },
  },
  photo: {
    data: Buffer,
    contentType: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
});

const AthleteModel = mongoose.model('athletes', AthleteSchema);
module.exports = AthleteModel;
