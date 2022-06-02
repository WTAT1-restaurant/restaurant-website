const mongoose = require('mongoose');

const enumStatus = {
	values: ['waiting', 'confirmed', 'transferring', 'delivered', 'cancelled'],
};

const enumPaymentMethod = {
	values: ['cash', 'paypal', 'applepay'],
};

const checkoutSchema = mongoose.Schema({
	userID: {
		type: String,
		ref: 'User',
	},
	cartID: {
		type: String,
		ref: 'Cart',
		required : true
	},
	status: {
		type: String,
		enum: enumStatus,
		default: 'waiting',
	},
    
    fullname: {
        type: String,
        default: '',
    },
	email: {
		type: String,
		default: '',
	},

	address: {
		type: String,
		default: '',
	},
    zip: {
		type: Number,
		default: '',
	},
	city: {
		type: String,
		default: '',
	},

    items: {
        type: Array,
        default: []
      },

	totalQuantity: {
		type: Number,
		default: 0,
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

	shippingFee: {
		type: Number,
		default: 0,
	},
	totalPayment: {
		type: Number,
		required: [true],
	}, 	
	paymentMethod: {
		type: String,
		enum: enumPaymentMethod,
		
	},

});

const checkout = mongoose.model('checkout', checkoutSchema);
module.exports = checkout;