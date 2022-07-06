//This module will contain all the API routes with JSON response bodies.
//localhost:3000/api/patheName
// ?format=json.
const router = require("express").Router();
const userController = require("../controllers/usersController");
const menuController = require("../controllers/menuController");
const cartController = require("../controllers/cartController");

router.post("/login", userController.apiAuthenticate);
router.use(userController.verifyJWT);
// router.use(userController.verifyToken);
router.get("/users", userController.index, userController.respondJSON);
router.use(userController.errorJSON);

router.get("/menu", menuController.index, menuController.respondJSON);
router.use(menuController.errorJSON);

router.get("/cart", cartController.index, cartController.respondJSON);
router.use(cartController.errorJSON);

module.exports = router;
