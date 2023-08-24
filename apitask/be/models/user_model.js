const mongoose = require('mongoose');

// schema 
const userSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }, 
  gender: {
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
  },
  adhar: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Model name
module.exports = mongoose.model('User', userSchema);
