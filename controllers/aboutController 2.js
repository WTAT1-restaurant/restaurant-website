 "use scrict";
const OpeningHours = require("../models/openingHours");
const httpStatus = require("http-status-codes");

    getOpeningHours: (req, res) => {
        var query = OpeningHours.find({});
        query.exec((error, data) => {
            if (data) { res.send(data) };
        });
    },

    getOpeningHourOnDay: (req, res) => {
        const day = req.params.day;
        var query = OpeningHours.findOne({});
        query.exec((error, data) => {
            if (data) {
                res.send(data[day]);
            }
        });
    },