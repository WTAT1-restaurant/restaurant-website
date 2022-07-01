"use scrict";
const checkOut = require("./../models/checkout");
const Cart = require("./../models/cart");
const { use } = require("express/lib/application");
const user = require("../models/user");

var ObjectId = require("mongoose").Types.ObjectId;
var query = { checkOut_id: new ObjectId(checkOut._id) };

//global variables
var sizeCart = 0;
var totalPrice = 0;

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
          for (const item of itemArray) {
            sizeCart = sizeCart + item.quantity;
          }
          // TODO: decide whether to get rid of the totalPrice or not.
          // const totalPrice = cartDoc.totalCost;
          for (const item of itemArray) {
            totalPrice = totalPrice + item.quantity * item.price;
          }
          res.render("checkout", {
            cart: cartDoc,
            cartSize: sizeCart,
            cartPrice: totalPrice,
            title: "checkout",
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
        return [];
      });
  },

  getBilling: (req, res, next) => {
    checkOut
      .findOne()
      .sort({ _id: -1 })
      .then((checkout) => {
        if (checkout) {
          res.render("placeOrder", { user: checkout, title: "info" });
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
      .catch((error) =>
        req.flash(
          "error",
          `Failed to save this option because: ${error.message}.`,
          res.redirect("/checkout")
        )
      );
  },

  pickUpOrder: (req, res) => {
    checkOut
      .updateMany({ query }, { $set: { pickUp: true, delivery: false } })
      .then(
        req.flash("success", ` food will be picked up `),
        res.redirect("/checkout")
      )
      .catch((error) =>
        req.flash(
          "error",
          `Failed to save this option account because: ${error.message}.`,
          res.redirect("/checkout")
        )
      );
  },

  saveInfo: (req, res) => {
    checkOut
      .find()
      .exec()
      .then((checkout) => {
        if (checkout != null) {
          checkout = new checkOut({
            fullname: req.body.fullname,
            email: req.body.email,
            address: req.body.address,
            zip: req.body.zip,
            city: req.body.city,
          });
          checkout
            .save()
            .then(
              req.flash("success", ` your billing information is saved `),
              res.redirect("/checkout")
            )
            .catch((error) => {
              if (error)
                req.flash(
                  "error",
                  `Failed to save billing because: ${error.message}.`,
                  res.redirect("/checkout")
                );
            });
        } else {
          checkout
            .updateMany(
              { query },
              {
                $set: {
                  fullname: req.body.fullname,
                  email: req.body.email,
                  address: req.body.address,
                  zip: req.body.zip,
                  city: req.body.city,
                },
              }
            )
            .then(
              req.flash("success", ` your billing information is updated `),
              res.redirect("/checkout")
            )
            .catch((error) =>
              req.flash(
                "error",
                `Failed to update billing information because: ${error.message}.`,
                res.redirect("/checkout")
              )
            );
        }
      });
  },

  setTime: (req, res) => {
    let time = req.body.time;
    checkOut
      .updateMany({ query }, { $set: { time: time } })
      .then(
        req.flash("success", ` food will be picked up at ${time}`),
        res.redirect("/checkout")
      )
      .catch((error) =>
        req.flash(
          "error",
          `Failed to set time due to : ${error.message}.`,
          res.redirect("/checkout")
        )
      );
  },

  setPayment: (req, res) => {
    let payment = req.body;
    let paymentMethod = payment.Method;
    checkOut
      .updateMany({ query }, { $set: { paymentMethod: paymentMethod } })
      .then(
        req.flash(
          "success",
          ` your payment with ${paymentMethod} have been saved`
        ),
        res.redirect("/checkout")
      )
      .catch((error) => {
        req.flash(
          "error",
          `Failed to create user account because: ${error.message}.`,
          res.redirect("/checkout")
        );
      });
  },
};
