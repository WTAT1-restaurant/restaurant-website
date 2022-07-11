const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cartController');

// shopping Cart
router.get("/", cartController.get);
router.get("/items/count", cartController.countBasketItems);
router.post("/add", cartController.addItem, cartController.redirectView);
router.post("/remove", cartController.removeItem, cartController.redirectView);

module.exports = router;
 