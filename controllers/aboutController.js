"use scrict";

const OpeningHours = require("../models/openingHours");
const httpStatus = require("http-status-codes");

module.exports = { 
    getOpeningHoursForRender: (req, res) => {
        OpeningHours.findOne({})
        .exec()
        .then((openingHours) => {
            if (openingHours == null) {
                res.send("No opening times defined");
            } else {
                res.render("about", {
                openingHours: openingHours,
                title: "about"
                });
            }
        }) 
        .catch((error) => {
            console.log(error.message);
            return [];
        });
    },

    getOpeningHours: (req, res) => {
        OpeningHours.findOne({})
        .exec()
        .then ((openingHours)=> {
            if (openingHours) { 
                res.send(openingHours); 
            } else {
                res.send("No opening times defined");
            }
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        });
    },

    getOpeningHourOnDay: (req, res) => {
        const day = req.params.day;
        OpeningHours.findOne({})
            .exec()
            .then(openingHours => {
                if (openingHours) {
                    // openingHours = JSON.parse(JSON.stringify(openingHours));
                    const openingHoursOnDay = openingHours[day];
                    res.send(openingHoursOnDay);
                } else {
                    res.send("No opening time for this day not defined");
                }
            })
            .catch((error) => {
                console.log(error.message);
                return [];
            });
    },

    getRestaurantStatus: (req, res) => {
        OpeningHours.findOne({})
            .exec()
            .then(retaurantInfo => {
                if (retaurantInfo) {
                    const restaurantStatus = retaurantInfo["isOpen"];
                    res.send(restaurantStatus);
                } else {
                    res.send("Can't determine if the restaurant is open");
                }
            })
            .catch((error) => {
                console.log(error.message);
                return [];
            });
    },

    closeRestaurant: (req, res, next) => {
        // const change = req.body.newRestaurantStatus;
        // console.log(change);
        // OpeningHours.findOneAndUpdate({}, {isOpen: false})
        //     .exec()
        //     .then(data => {
        //         data.save;
        //         res.locals.redirect = '/menu/restaurantView';
        //         next();
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //         next(error);
        //     });
        OpeningHours.updateOne({}, {isOpen: false})
            .exec()
            .then((data) => {
                res.redirect = '/menu/restaurantView';
            })
            .catch((error) => {
                console.log(error.message);
                next(error);
            });
    },

    openRestaurant: (req, res, next) => {
        // const change = req.body.newRestaurantStatus;
        // console.log(change);
        // OpeningHours.findOneAndUpdate({}, {isOpen: true})
        //     .exec()
        //     .then(data => {
        //         data.save;
        //         res.locals.redirect = '/menu/restaurantView';
        //         next();
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //         next(error);
        //     });
        OpeningHours.updateOne({}, {isOpen: true})
            .exec()
            .then((data) => {
                res.redirect = '/menu/restaurantView';
            })
            .catch((error) => {
                console.log(error.message);
                next(error);
            });
    },
};