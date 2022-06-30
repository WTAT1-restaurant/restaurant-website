const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require('../controllers/usersController');
const { check, validationResult } = require("express-validator");

router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.post("/create",
    check("email", "Email is invalid").normalizeEmail({ gmail_remove_dots: false, all_lowercase: true }).trim().isEmail(),
    check("zipCode", "Zip Code is invalid").notEmpty().isInt().isLength({ min: 5, max: 5 }),
    check("password", "Password cannot be empty").notEmpty(),
    usersController.validateCreate, usersController.create, usersController.redirectView);
router.get("/login", usersController.login);
router.post("/login", usersController.authenticate, usersController.redirectView);
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;
