'use scrict'
// https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose

// Just created file, couldnt finish it
const Cart = require('./../models/cart');

// 1. Check if the cart already exists in the database
// 2. If the cart doesn't exist, create a new cart with the given userID, item, total cost and save it in the database
// 3. If the cart exists, add item to the cart, update total cost and save it in the database
exports.addItem = (req, res) => {
	Cart.findOne({"userID": req.body.userID})
        .exec()
        .then(cart => {
			if (cart == null) {
				cart = new Cart({
					userID: req.body.userID,
					items: [
						{
							"title": req.body.title,
							"price": parseFloat(req.body.price),
							"quantity": 1
						}
					],
					totalCost: req.body.price
				})
				cart.save()
					.then(result => {
						res.send("Item added to cart");
					})
					.catch(error => {
						if (error) res.send(error);
					});
			} else {
				const preExistentCartItem = cart.items.find(item => item.title == req.body.title);
				
				if (preExistentCartItem) { 
					preExistentCartItem.quantity = preExistentCartItem.quantity + 1;
					cart.totalCost = cart.totalCost + parseFloat(req.body.price);
					// solution for mongoose to keep track of changes in a mixed Array and being able to save those changes. 
					// https://mongoosejs.com/docs/schematypes.html
					// TODO: create a nested/ child schema for the array, so that mongoose can save without the markModified call.
					cart.markModified('items')
					cart.save()
						.then(result => {
							res.send("Item added to cart");
						})
						.catch(error => {
							if (error) res.send(error);
						});
				} else {
					cart.items.push(
						{
							"title": req.body.title,
							"price": parseFloat(req.body.price),
							"quantity": 1
						}
					);
					cart.totalCost = cart.totalCost + parseFloat(req.body.price)
					cart.save()
						.then(result => {
							res.send("Item added to cart");
						})
						.catch(error => {
							if (error) res.send(error);
						});
				}
			}
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
};

exports.removeItem = (req, res) => {
	Cart.findOne({"userID": req.body.userID})
	.exec()
	
	.then(cart => {
		const preExistentCartItem = cart.items.find(item => item.title == req.body.title);
		const newCartQuantity = preExistentCartItem.quantity - 1;
		if (newCartQuantity != 0) {
			preExistentCartItem.quantity = newCartQuantity;
			cart.totalCost = cart.totalCost - parseFloat(req.body.price);
			// solution for mongoose to keep track of changes in a mixed Array and being able to save those changes. 
			// https://mongoosejs.com/docs/schematypes.html
			// TODO: create a nested/ child schema for the array, so that mongoose can save without the markModified call.
			cart.markModified('items')
			cart.save()
				.then(result => {
					res.send("Item removed from cart");
				})
				.catch(error => {
					if (error) res.send(error);
				});
		} else {
			cart.items.pull(
				{
					"title": req.body.title,
					"price": parseFloat(req.body.price),
					"quantity": 1
				}
			);
			cart.totalCost = cart.totalCost - parseFloat(req.body.price)
			cart.save()
				.then(result => {
					res.send("Item removed from cart");
				})
				.catch(error => {
					if (error) res.send(error);
				});
		}
	})
	.catch((error) => {
		console.log(error.message);
		return [];
	})
	
};

// TODO: inplement what to output when there was no shopping cart created yet. 
exports.get = (req, res) => {
	// Cart.findOne({"userID": req.body.userID})
	Cart.findOne({"userID": 1})
        .exec()
        .then(cart => {
			if (cart == null) {
			res.send("Empty shopping cart");
			} else {
				const cartDoc = cart;
				const itemArray = cart.items;
				var sizeCart = 0;
				for (const item of itemArray){
					sizeCart = sizeCart + item.quantity;
				};
				// TODO: decide whether to get rid of the totalPrice or not. 
				// const totalPrice = cartDoc.totalCost;
				var totalPrice = 0;
				for (const item of itemArray){
					totalPrice = totalPrice + item.quantity * item.price;
				};
				res.render("cart", {cart: cartDoc, cartSize: sizeCart, cartPrice: totalPrice});
			}
		})
		.catch((error) => {
            console.log(error.message);
            return [];
        })
};

// possible function for the nav bar? Still in progress
exports.countBasketItems = (req, res) => {
	Cart.findOne({"userID": 1})
        .exec()
        .then(cart => {
			const itemArray = cart.items;
			var sizeCart = 0;
			for (const item of itemArray){
				sizeCart = sizeCart + item.quantity;
			};
			res.render("cart", {cartSize: sizeCart});
		})
		.catch((error) => {
            console.log(error.message);
            return [];
        })
};
