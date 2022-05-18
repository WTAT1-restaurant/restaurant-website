
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
							"price": req.body.price
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
				cart.items.push(
					{
						"title": req.body.title,
						"price": parseFloat(req.body.price)
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
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
};

exports.removeItem = (req, res) => {
};
