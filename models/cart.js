const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
 // user model has to be created and ref refers to user model (maybe next sprint)
  userID: {
    type: String,
    ref: 'User'
  },
  items: {
    type: Array,
    default: []
  },
  totalCost: {
    type: Number,
    default: 0
  }
});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;
