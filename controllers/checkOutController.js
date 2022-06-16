"use scrict";
const checkOut = require("./../models/checkout");
const Cart = require("./../models/cart");
const { use } = require("express/lib/application");

module.exports = {

    get: (req, res) => {
        // Cart.findOne({"userID": req.body.userID})
        Cart.findOne({ userID: 1 })
            .exec()
            .then((cart) => {
                if (cart == null) {
                    res.send("Empty shopping cart");
                } else {
                    const cartDoc = cart;
                    const itemArray = cart.items;
                    var sizeCart = 0;
                    for (const item of itemArray) {
                        sizeCart = sizeCart + item.quantity;
                    }
                    // TODO: decide whether to get rid of the totalPrice or not.
                    // const totalPrice = cartDoc.totalCost;
                    var totalPrice = 0;
                    for (const item of itemArray) {
                        totalPrice = totalPrice + item.quantity * item.price;
                    }
                    res.render("checkout", {
                        cart: cartDoc,
                        cartSize: sizeCart,
                        cartPrice: totalPrice,
                    });
                }
            })
            .catch((error) => {
                console.log(error.message);
                return [];
            });
    },


    // get: (req, res) => {
    //   res.render("checkout");
    // },

    deliverOrder: (req, res) => {
        checkOut.updateMany({ userID: 1 }, { $set: { delivery: true, pickUp: false } })
            .then((cart) => res.send(" the food will be delivered"))
            .catch((err) => res.status(422).json(err));
    },

    pickUpOrder: (req, res) => {
        checkOut.updateMany({ userID: 1 }, { $set: { pickUp: true, delivery: false } })
            .then(res.send(" the food will be picked up"))
            .catch((err) => res.status(422).json(err));
    },

    saveInfo: (req, res) => {
        checkOut.find()
            .exec()
            .then((checkout) => {
                if (checkout != null) {
                    checkout = new checkOut({
                        fullname: req.body.fullname,
                        email: req.body.email,
                        address: req.body.address,
                        zip: req.body.zip,
                        city: req.body.city,

                    })
                    checkout
                        .save()
                        .then((result) => {
                            res.send("your information have been saved");
                        })
                        .catch((error) => {
                            if (error) res.send(error);
                        });
                } else {
                    checkout.updateMany({ userID: 1 }, {
                        $set: {
                            fullname: req.body.fullname, email: req.body.email, address: req.body.address,
                            zip: req.body.zip,
                            city: req.body.city,
                        }
                    })
                        .then(res.send("your information have been updated and saved"))
                        .catch((err) => res.status(422).json(err));
                }

            })
    },

    setTime: (req, res) => {
        checkOut.updateMany({ fullname: 'lana' }, { $set: { time: req.body.time } })
            .then(res.send(" the food will be picked up at the this time"))
            .catch((err) => res.status(422).json(err));

    }
}
