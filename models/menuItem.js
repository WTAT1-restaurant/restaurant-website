const mongoose = require('mongoose');

// define menu item schema
const menuItemSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  vegetarian: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: false
  },
  fats: {
    type: Number,
    required: false
  },
  carbohydrates: {
    type: Number,
    required: false
  },
  calories: {
    type: Number,
    required: false
  }
});

// export menu item model based on schema
module.exports = mongoose.model('menuItem', menuItemSchema);
