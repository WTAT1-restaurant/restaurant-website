const mongoose = require('mongoose');

// schema defines structure
const schema = mongoose.schema;

const menuSchema = new schema({

  id: {
    type: Integer,
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
    type: Integer,
    required: true
  },
  weight: {
      type: Integer,
      required: false
    },
  fats: {
      type: Integer,
      required: false
    },
  carbohydrates: {
      type: Integer,
      required: false
    },
  calories: {
      type: Integer,
      required: false
},
});

// define model that is based from schema
const menu = mongoose.model('menu', menuSchema);
module.exports = menu;
