"use scrict";
const checkOut = require("./../models/checkout");
const Cart = require("./../models/cart");
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
    Cart.updateMany({ userID: 1 }, { $set: { delivery: true, pickUp: false } })
      .then((cart) => res.send(" the food will be delivered"))
      .catch((err) => res.status(422).json(err));
  },

  pickUpOrder: (req, res) => {
    Cart.updateMany({ userID: 1 }, { $set: { pickUp: true, delivery: false } })
      .then(res.send(" the food will be picked up"))
      .catch((err) => res.status(422).json(err));
  },
};
