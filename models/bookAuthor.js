const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookAuthorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true
  },
  updation_date: {
    type: String
  },
  creation_date: {
    type: String
  }
})

module.exports = mongoose.model('BookAuthor', bookAuthorSchema);