const mongoose = require("mongoose");

const timeSchema = mongoose.Schema({
    hour: {
        type: Number,
        required: true,
        default: 0
    },
    minute: {
        type: Number,
        required: true,
        default: 0
    }
});

const openingDaySchema = mongoose.Schema({
    open: {
        type: timeSchema,
        required: true
    },
    close: {
        type: timeSchema,
        required: true
    }
});

const openingHoursSchema = mongoose.Schema({
    Monday: {
        type: openingDaySchema,
        required: true
    },
    Tuesday: {
        type: openingDaySchema,
        required: true
    },
    Wednesday: {
        type: openingDaySchema,
        required: true
    },
    Thursday: {
        type: openingDaySchema,
        required: true
    },
    Friday: {
        type: openingDaySchema,
        required: true
    },
    Saturday: {
        type: openingDaySchema,
        required: true
    },
    Sunday: {
        type: openingDaySchema,
        required: true
    },
});

module.exports = mongoose.model("openingHours", openingHoursSchema);
