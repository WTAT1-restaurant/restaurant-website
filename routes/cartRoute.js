const express = require("express");
const router = express.Router();

const cartController = require('../controllers/cartController');


// shopping Cart
router.get("/cart", cartController.get);

router.get("/API/cart", cartController.countBasketItems);

router.post("/cart/add", cartController.addItem, cartController.redirectView);

router.post("/cart/remove", cartController.removeItem, cartController.redirectView);

module.exports = router;
