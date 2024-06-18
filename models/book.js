const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Book name cannot be empty'],
        unique: true,
    },
    description: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookAuthor',
        required: [true, 'book author cannot be empty']
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

module.exports = mongoose.model('Book', bookSchema);