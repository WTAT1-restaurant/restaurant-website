const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require('../models/user');

const usersController = require('../controllers/usersController');

const { body, check, validationResult } = require("express-validator");


// Users
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create",
    check("email", "Email is invalid").normalizeEmail({ gmail_remove_dots: false, all_lowercase: true }).trim().isEmail(),
    check("zipCode", "Zip Code is invalid").notEmpty().isInt().isLength({ min: 5, max: 5 }),
    check("password", "Password cannot be empty").notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messages = errors.array().map(e => e.msg);
            req.skip = true;
            req.flash("error", messages.join(" and "));
            res.locals.redirect = "/users/new";
            next();
        } else {
            next();
        }
    }, usersController.create, usersController.redirectView);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

// Add information about the user and whether he is logged in or not
router.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = router;

