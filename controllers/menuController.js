"use scrict";
const menuItem = require("../models/menuItem");
const MenuItem = require("../models/menuItem");
const httpStatus = require("http-status-codes");

// save data in mongodb

// database.forEach(menuItem => {
//     menuItem.save((error, savedDocument) => {
//         if (error) console.log(error);
//         console.log(savedDocument);
//     });
// });

module.exports = {
    getItem: (req, res) => {
        // create a query to find a menu item by ID
        var query = MenuItem.findOne({
            id: req.params.itemId
        });
        // execute query
        query.exec((error, data) => {
            if (data) {
                res.render("item", { "item": data, title: data.title });
            }
        });
    },
    index: (req, res, next) => {

        MenuItem.find({})
            .then((items) => {
                res.locals.items = items;
                next();
            })
            .catch((error) => {
                console.log(`Error fetching items: ${error.message}`);
                next(error);
            });
    },

    getMenu: (req, res) => {

        let veggie = req.query.vegetarian;
        let priceSorted = req.query.sortPrice;

        if (veggie) {
            var query = MenuItem.find({
                vegetarian: true
            });

            if (priceSorted) {
                query.sort({ price: 1 }).exec((error, data) => {
                    if (data) {
                        res.render("menu", { "items": data, "vegetarian": true, title: "vegetarian menu" });
                    }
                });
            } else {
                query.exec((error, data) => {
                    if (data) {
                        res.locals.items = data;
                        res.render("menu", { "items": data, "vegetarian": true, title: "vegetarian menu" });

                    }
                });
            }

        } else {
            var query = MenuItem.find({});

            if (priceSorted) {
                query.sort({ price: 1 }).exec((error, data) => {
                    if (data) {
                        res.render("menu", { "items": data, title: "menu" });
                    }
                });
            } else {
                query.exec((error, data) => {
                    if (data) {
                        res.render("menu", { "items": data, title: "menu" });
                    }
                });
            }
        }

    },
    // add the menu to the restaurant page
    getRestaurantMenu: (req, res) => {
        var query = MenuItem.find({});
        query.exec((error, data) => {
            if (data) {
                res.render("restaurant", { "items": data, title: "restaurant menu" });
            }
        });
    },

    // allows a restaurant owner to add new item to a menu
    addNewItem: (req, res, next) => {
        MenuItem.findOne().sort('-id').exec(function (error, data) {
            var id = data.id + 1;
            console.log(id);
            console.log(req.body);
            var menuItem = new MenuItem({
                id: id,
                vegetarian: req.body.vegetarian === "on",
                title: req.body.title,
                image: req.body.picture,
                price: req.body.price,
                weight: req.body.weight,
                fats: req.body.fats,
                carbohydrates: req.body.carbohydrates,
                calories: req.body.calories
            });
            menuItem
                .save()
                .then((data) => {
                    res.locals.redirect = "/restaurant";
                    res.locals.addedMenuItem = data;
                    next();
                })
                .catch((error) => {
                    console.log(`Error saving menu item: ${error.message}`);
                    next(error);
                });
        });
    }, 
    // allows a restaurant owner to delete items from a menu
    deleteMenuItem: (req, res, next) => {
        MenuItem.findOne({
            id: req.params.itemId
        }).remove()
            .then(() => {
                res.locals.redirect = "/restaurant";
                next();
            })
            .catch(error => {
                console.log(`Error deleting menu item by ID: ${error.message}`);
                next();
            });
    },
    // update menu item price and image
    update: (req, res, next) => {
        let itemId = req.params.itemId;
        let price = req.body.price;
        let picture = req.body.picture;
        // find menu item by id and update its price and image
        MenuItem.findOneAndUpdate({
            id: itemId
        }, {
            price: price,
            image: picture
        })
            .then(data => {
                res.locals.redirect = '/restaurant';
                next();
            })
            .catch(error => {
                console.log(`Error updating menu item by ID: ${error.message}`);
                next(error);
            });
    },
    // Handle requests to view the creation form, to submit
    // data from the creation form, and display a view
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
    }
};
