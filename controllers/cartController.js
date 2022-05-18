
// https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose

// Just created file, couldnt finish it
const Cart = require('./../models/cart');

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
    // let newSubscriber = new Subscriber({
    //     name: req.body.name,
    //     email: req.body.email,
    //     zipCode: req.body.zipCode
    // });
    // newSubscriber.save()
    //     .then(result => {
    //         res.render("thanks");
    //     })
    //     .catch(error => {
    //         if (error) res.send(error);
    //     });
};
