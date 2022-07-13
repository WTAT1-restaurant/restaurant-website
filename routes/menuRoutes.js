const express = require("express");
const router = express.Router();
const menuController = require('../controllers/menuController');
const aboutController = require('../controllers/aboutController');

// get menu item by ID
router.get("/customerView", menuController.getMenu);
router.get("/restaurantView", menuController.getRestaurantMenu);
router.post("/open", menuController.openRestaurant);
router.post("/close", menuController.closeRestaurant);
router.get("/items/:itemId", menuController.getItem);
router.post("/items", menuController.addNewItem, menuController.redirectView);
router.post("/items/:itemId/update", menuController.update, menuController.redirectView);
router.post("/items/:itemId/delete", menuController.deleteMenuItem, menuController.redirectView);
router.post("/items", menuController.addNewItem);



module.exports = router;
 