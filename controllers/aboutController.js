"use scrict";

const OpeningHours = require("../models/openingHours");
const httpStatus = require("http-status-codes");

module.exports = { 
    getOpeningHoursForRender: (req, res) => {
        // Cart.findOne({"userID": req.body.userID})
        OpeningHours.find({})
        .exec()
        .then((times) => {
            if (times == null) {
                res.send("No opening times defined");
            } else {
                res.render("about", {
                openingHours: times,
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
        OpeningHours.find({})
        .exec()
        .then ((times)=> {
            if (times) { 
                res.send(times); 
            } else {
                res.send("No opening times defined");
            }
        });
    },

    getOpeningHourOnDay: (req, res) => {
        const day = req.params.day;
        OpeningHours.findOne({})
            .exec()
            .then(openingHours => {
                if (openingHours) {
                    // openingHours = JSON.parse(JSON.stringify(openingHours));
                    const openingHourOnDay = openingHours[day];
                    res.send(openingHourOnDay);
                } else {
                    res.send("No opening times defined");
                }
            });
    },
};