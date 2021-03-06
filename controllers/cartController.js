"use scrict";
// https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose

// Just created file, couldnt finish it
const Cart = require("./../models/cart");
const httpStatus = require("http-status-codes");

// 1. Check if the cart already exists in the database
// 2. If the cart doesn't exist, create a new cart with the given userID, item, total cost and save it in the database
// 3. If the cart exists, add item to the cart, update total cost and save it in the database
 
module.exports = {
  addItem: (req, res, next) => {
    Cart.findOne({ userID: req.body.userID })
      .exec()
      .then((cart) => {
        if (cart == null) {
          cart = new Cart({
            userID: req.body.userID,
            items: [
              {
                title: req.body.title,
                price: parseFloat(req.body.price),
                quantity: 1,
              },
            ],
            totalCost: req.body.price,
          });
          cart
            .save()
            .then((result) => {
              req.flash("success", `Item added to cart: ${req.body.title}`);
              res.locals.redirect = "/menu";
              next();
            })
            .catch((error) => {
              req.flash(
                "error",
                `Error adding item to cart: ${error.message}.`);
              res.locals.redirect = "/menu";
              next();
            });
        } else {
          const preExistentCartItem = cart.items.find(
            (item) => item.title == req.body.title
          );

          if (preExistentCartItem) {
            preExistentCartItem.quantity = preExistentCartItem.quantity + 1;
            cart.totalCost = cart.totalCost + parseFloat(req.body.price);
            // solution for mongoose to keep track of changes in a mixed Array and being able to save those changes.
            // https://mongoosejs.com/docs/schematypes.html
            // TODO: create a nested/ child schema for the array, so that mongoose can save without the markModified call.
            cart.markModified("items");
            cart
              .save()
              .then((result) => {
                req.flash("success", `Item added to cart: ${req.body.title}`);
                res.locals.redirect = "/menu/customerView";
                next();
              })
              .catch((error) => {
                req.flash(
                  "error",
                  `Error adding item to cart: ${error.message}.`);
                res.locals.redirect = "/menu/customerView";
                next();
              });
          } else {
            cart.items.push({
              title: req.body.title,
              price: parseFloat(req.body.price),
              quantity: 1,
            });
            cart.totalCost = cart.totalCost + parseFloat(req.body.price);
            cart
              .save()
              .then((result) => {
                req.flash("success", `Item added to cart: ${req.body.title}`);
                res.locals.redirect = "/menu/customerView";
                next();
              })
              .catch((error) => {
                req.flash(
                  "error",
                  `Error adding item to cart: ${error.message}.`);
                res.locals.redirect = "/menu/customerView";
                next();
              });
          }
        }
      })
      .catch((error) => {
        req.flash(
          "error",
          `Error adding item to cart: ${error.message}.`);
        res.locals.redirect = "/menu/customerView" ;
        next();
      });
  },

  removeItem: (req, res, next) => {
    Cart.findOne({ userID: req.body.userID })
      .exec()

      .then((cart) => {
        const preExistentCartItem = cart.items.find(
          (item) => item.title == req.body.title
        );
        const newCartQuantity = preExistentCartItem.quantity - 1;
        if (newCartQuantity != 0) {
          preExistentCartItem.quantity = newCartQuantity;
          cart.totalCost = cart.totalCost - parseFloat(req.body.price);
          // solution for mongoose to keep track of changes in a mixed Array and being able to save those changes.
          // https://mongoosejs.com/docs/schematypes.html
          // TODO: create a nested/ child schema for the array, so that mongoose can save without the markModified call.
          cart.markModified("items");
          cart
            .save()
            .then((result) => {
              req.flash("success", `Item removed from cart: ${req.body.title}`);
              res.locals.redirect = "/menu/customerView";
              next();
            })
            .catch((error) => {
              req.flash(
                "error",
                `Error removing item from cart: ${error.message}.`);
              res.locals.redirect = "/menu/customerView";
              next();
            });
        } else {
          cart.items.pull({
            title: req.body.title,
            price: parseFloat(req.body.price),
            quantity: 1,
          });
          cart.totalCost = cart.totalCost - parseFloat(req.body.price);
          cart
            .save()
            .then((result) => {
              req.flash("success", `Item removed from cart: ${req.body.title}`);
              res.locals.redirect = "/menu/customerView";
              next();
            })
            .catch((error) => {
              req.flash(
                "error",
                `Error removing item from cart: ${error.message}.`);
              res.locals.redirect = "/menu/customerView";
              next();
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
        return [];
      });
  },
  index: (req, res, next) => {
       
    Cart.find({})
        .then((cart) => {
            res.locals.cart = cart;
            next();
        })
        .catch((error) => {
            console.log(`Error fetching cart: ${error.message}`);
            next(error);
        });
},


  // TODO: inplement what to output when there was no shopping cart created yet.
  get: (req, res) => {
    // Cart.findOne({"userID": req.body.userID})
    Cart.findOne({ userID: 1 })
      .exec()
      .then((cart) => {
        res.locals.cart = cart;
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
          res.render("cart", {
            cart: cartDoc,
            cartSize: sizeCart,
            cartPrice: totalPrice,
            title: "shopping cart"
          });
        }
      }) 
      .catch((error) => {
        console.log(error.message);
        return [];
      });
  },

  countBasketItems: (req, res) => {
    Cart.findOne({ userID: 1 })
      .exec()
      .then((cart) => {
        const itemArray = cart.items;
        var sizeCart = 0;
        for (const item of itemArray) {
          sizeCart = sizeCart + item.quantity;
        }
        res.send(sizeCart.toString());
      })
      .catch((error) => {
        console.log(error.message);
        return [];
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  respondJSON: (req, res) => {
    res.json({
    status: httpStatus.OK,
    data: res.locals
    });
    },
    errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
    errorObject = {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: error.message
    };
    } else {
    errorObject = {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: "Unknown Error."
    };
    }
    res.json(errorObject);
    },

};
