"use scrict";
const checkOut = require("./../models/checkout");
const Cart = require("./../models/cart");
const { use } = require("express/lib/application");

var ObjectId = require("mongoose").Types.ObjectId;
var query = { checkOut_id: new ObjectId(checkOut._id) };

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
          res.render("checkout",  {
            cart: cartDoc,
            cartSize: sizeCart,
            cartPrice: totalPrice,
          }
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
        return [];
      });
  },

  getOrder: (req, res) => {
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
        res.render("placeOrder",  {
        
          cartSize: sizeCart,
          cartPrice: totalPrice,
        }
        );
      }
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    });
  },

  deliverOrder: (req, res) => {
    checkOut
      .updateMany({ query }, { $set: { delivery: true, pickUp: false } })
      .then(
        req.flash("success", ` food will be delivered `),
        res.redirect("/checkout")
      )
      .catch((err) => res.status(422).json(err));
  },

  pickUpOrder: (req, res) => {
    checkOut
      .updateMany({ query }, { $set: { pickUp: true, delivery: false } })
      .then(
        req.flash("success", ` food will be picked up `),
        res.redirect("/checkout")
      )
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
                        if (error) res.send( "THE ERROR IS HERE" + error);
                    });
            } else {
                checkout.updateMany({ query }, {
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
    let time = req.body.time;
    checkOut
      .updateMany({query}, { $set: { time: time } })
      .then(
        req.flash("success", ` food will be picked up at ${time}`),
        res.redirect("/checkout")
      )
      .catch((err) => res.status(422).json(err));
  },

  setPayment: (req, res) => {
    let payment = req.body;
    let paymentMethod = payment.Method;
    checkOut
      .updateMany({ query}, { $set: { paymentMethod : paymentMethod } })
      .then(res.send("your paymentMethod information have been saved"))
      .catch((error) => {
        if (error) res.send( "THE ERROR IS  " + error);
    });
  },
};
