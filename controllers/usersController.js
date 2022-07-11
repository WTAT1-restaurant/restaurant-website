"use scrict";
const passport = require("passport");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const httpStatus = require("http-status-codes");
const token = process.env.TOKEN || "OUR_API_TOKEN";
const jsonWebToken = require("jsonwebtoken");

module.exports = {
    index: (req, res, next) => {

        User.find({})
            .then((users) => {
                res.locals.users = users;
                next();
            })
            .catch((error) => {
                console.log(`Error fetching users: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        if (req.query.format === "json") {
            res.json(res.locals.users);
        } else {
            res.render("users/index", { title: "users overview" });
        }
    },
    new: (req, res) => {
        res.render("users/new", { title: " setup new user" });
    },
    validateCreate: (req, res, next) => {
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
    },
    create: (req, res, next) => {
        if (req.skip) next();

        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last,
            },
            address: {
                streetName: req.body.streetName,
                houseNumber: req.body.houseNumber,
                addition: req.body.addition,
                zipCode: req.body.zipCode,
                city: req.body.city,
            },
            email: req.body.email,
            role: req.body.role,
            apiToken: req.body.apiToken
        };

        let newUser = new User(userParams);

        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", `${user.fullName}'s account created successfully!`);
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            } else {
                console.log(`Error saving user: ${error.message}`);
                res.locals.redirect = "/users/new";
                req.flash(
                    "error",
                    `Failed to create user account because: ${error.message}.`);
                next();
            }
        });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        if (req.query.format === "json") {
            res.json(res.locals.user);
        } else {
            var firstName = res.locals.user.name.first;
            var lastName = res.locals.user.name.last;
            var title;
            if (lastName.charAt(lastName.length - 1) == "s") {
                title = firstName + " " + lastName + "' Profile";
            } else {
                title = firstName + " " + lastName + "'s Profile";
            }
            res.render("users/show", { title: firstName + " " + lastName + "'s Profile" });
        }
    },
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                var firstName = user.name.first;
                var lastName = user.name.last;
                if (lastName.charAt(lastName.length - 1) == "s") {
                    res.render("users/edit", {
                        user: user,
                        title: firstName + " " + lastName + "' profile"
                    });
                } else {
                    res.render("users/edit", {
                        user: user,
                        title: firstName + " " + lastName + "'s profile"
                    });
                }
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let userId = req.params.id;
        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            address: {
                streetName: req.body.streetName,
                houseNumber: req.body.houseNumber,
                addition: req.body.addition,
                zipCode: req.body.zipCode,
                city: req.body.city
            },
            email: req.body.email,
            role: req.body.role,
            apiToken: req.body.apiToken
        };

        User.findByUsername(userParams.email)
            .then(function (sanitizedUser) {
                if (sanitizedUser) {
                    sanitizedUser.setPassword(req.body.password, function () {
                        sanitizedUser.save();
                    });
                } else {
                    console.error('This user does not exist');
                }
            }, function (err) {
                console.error(err);
            });

        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                res.locals.redirect = `/users/${userId}/view`;
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error updating user by ID: ${error.message}`);
            });
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by ID ${error.message}`);
                next();
            });
    },

    login: (req, res) => {
        res.render("users/login", { title: "login" });
    },

    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),

    validate: (req, res, next) => {
        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.skip = true;
                req.flash("error", messages.join(" and "));
                res.locals.redirect = "/users/new";
                next();
            } else {
                next();
            }
        });
    },

    logout: (req, res, next) => {
        req.logout(function (error) {
            if (error) {
                console.log(`Error logging out ${error.message}`);
                next();
            }
            req.flash("success", "You have been logged out!");
            res.locals.redirect = "/";
            next();
        });
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
    verifyToken: (req, res, next) => {
        let token = req.query.apiToken;
        if (token) {
            User.findOne({ apiToken: token })
                .then(user => {
                    if (user) next();
                    else next(new Error("Invalid API token."));
                })
                .catch(error => {
                    next(new Error(error.message));
                });
        } else {
            next(new Error("Invalid API token."));
        }
    },

    apiAuthenticate: (req, res, next) => {
        passport.authenticate("local", (errors, user) => {
            if (user) {
                let signedToken = jsonWebToken.sign(
                    {
                        data: user._id,
                        exp: new Date().setDate(new Date().getDate() + 1)
                    },
                    "secret_encoding_passphrase"
                );
                res.json({
                    success: true,
                    token: signedToken
                });
            } else
                res.json({
                    success: false,
                    message: "Could not authenticate user."
                });
        })(req, res, next);
    },

    verifyJWT: (req, res, next) => {
        let token = req.headers.token;
        if (token) {
            jsonWebToken.verify(
                token,
                "secret_encoding_passphrase",
                (errors, payload) => {
                    if (payload) {
                        User.findById(payload.data).then(user => {
                            if (user) {
                                next();
                            } else {
                                res.status(httpStatus.FORBIDDEN).json({
                                    error: true,
                                    message: "No User account found."
                                });
                            }
                        });
                    } else {
                        res.status(httpStatus.UNAUTHORIZED).json({
                            error: true,
                            message: "Cannot verify API token."
                        });
                        next();
                    }
                }
            );
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: "Provide Token"
            });
        }
    }
};
