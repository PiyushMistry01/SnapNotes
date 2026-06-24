const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  date: {
    type: String,
    required: true
  },

  rotation: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Note', noteSchema)