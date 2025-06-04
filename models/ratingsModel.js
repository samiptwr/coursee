const mongoose = require('mongoose')

const ratingsSchema = new mongoose.Schema({
  ratingUser : {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }, ratingNumber: {
    type: Number,
    required: true
  }, comment: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Ratings', ratingsSchema)