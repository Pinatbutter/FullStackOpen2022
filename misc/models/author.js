const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
    required: false
  }
  
}, {  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
toObject: { virtuals: true } })

schema.virtual('booksWritten', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
  count: true
});

module.exports = mongoose.model('Author', schema)