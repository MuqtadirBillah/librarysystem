const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email cannot be empty']
  },
  password: {
    type: String,
    required: [true, 'password cannot be empty']
  },
  role: {
    type: String
  },
  is_active: {
    type: String
  },
  updation_date: {
    type: String
  },
  creation_date: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema);