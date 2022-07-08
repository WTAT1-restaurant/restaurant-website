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
            });
    },
};