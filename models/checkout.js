const mongoose = require("mongoose");

const enumStatus = {
  values: ["waiting", "confirmed", "transferring", "delivered", "cancelled"],
};

const enumPaymentMethod = {
  values: ["cash", "paypal", "applepay"],
};

const checkoutSchema = mongoose.Schema({
  cartID: {
    type: String,
    ref: "Cart",
    // required : true
  },
  status: {
    type: String,
    enum: enumStatus,
    default: "waiting",
  },

  fullname: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },

  address: {
    type: String,
    default: "",
  },
  zip: {
    type: Number,
    default: "",
    min: [10000, "Zip code too short"],
    max: 99999,
  },
  city: {
    type: String,
    default: "",
  },

  items: {
    type: Array,
    default: [],
  },

  totalQuantity: {
    type: Number,
    default: 0,
  },
  totalCost: {
    type: Number,
    default: 0,
  },

  delivery: {
    type: Boolean,
    default: false,
  },

  pickUp: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
    default: "",
  },

  shippingFee: {
    type: Number,
    default: 0,
  },
  totalPayment: {
    type: Number,
    // required: [true],
  },
  paymentMethod: {
    type: String,
	default: "not specified yet",
    enum: enumPaymentMethod,
    // required : true
  },
});

const checkout = mongoose.model("checkout", checkoutSchema);
module.exports = checkout;
