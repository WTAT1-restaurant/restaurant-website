//This module will contain all the API routes with JSON response bodies.
//localhost:3000/api/patheName
// ?format=json.
const router = require("express").Router();
const userController = require("../controllers/usersController");
const menuController = require("../controllers/menuController");
const cartController = require("../controllers/cartController");
router.get("/users", userController.index, userController.respondJSON);
router.use(userController.errorJSON);

router.get("/menu/customerView", menuController.index, menuController.respondJSON);
router.use(menuController.errorJSON);

router.get("/cart", cartController.index, cartController.respondJSON);
router.use(cartController.errorJSON);

module.exports = router;
