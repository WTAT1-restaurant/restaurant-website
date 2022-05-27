const mongoose = require('mongoose');

// TODO: create schema for the Array so that the changes can be saved by mongoose

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
  },
  delivery: {
    type: Boolean,
    default: false,
  },

  pickUp: {
    type: Boolean,
    default: false,
  },

});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;
