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
    open: {
        type: Boolean,
        required: true
    },
    monday: {
        type: openingDaySchema,
        required: true
    },
    tuesday: {
        type: openingDaySchema,
        required: true
    },
    wednesday: {
        type: openingDaySchema,
        required: true
    },
    thursday: {
        type: openingDaySchema,
        required: true
    },
    friday: {
        type: openingDaySchema,
        required: true
    },
    saturday: {
        type: openingDaySchema,
        required: true
    },
    sunday: {
        type: openingDaySchema,
        required: true
    },
});

module.exports = mongoose.model("openingHours", openingHoursSchema);
