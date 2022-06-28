const express = require("express");
const router = express.Router();

const menuController = require('../controllers/menuController');


// get menu item by ID
router.get("/menu/items/:itemId", menuController.getItem);

router.get("/menu", menuController.getMenu);


// page for the restaurant
router.get("/restaurant", menuController.getRestaurantMenu);

router.post("/menu/items", menuController.addNewItem, menuController.redirectView);

router.post("/menu/items/:itemId/update", menuController.update, menuController.redirectView);

router.post("/menu/items/:itemId/delete", menuController.deleteMenuItem, menuController.redirectView);



router.post("/menu/items", menuController.addNewItem);
module.exports = router;
