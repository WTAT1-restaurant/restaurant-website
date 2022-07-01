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

const openingHoursSchema = mongoose.Schema({
    Monday: {
        type: timeSchema,
        required: true
    },
    Tuesday: {
        type: timeSchema,
        required: true
    },
    Wednesday: {
        type: timeSchema,
        required: true
    },
    Thursday: {
        type: timeSchema,
        required: true
    },
    Friday: {
        type: timeSchema,
        required: true
    },
    Saturday: {
        type: timeSchema,
        required: true
    },
    Sunday: {
        type: timeSchema,
        required: true
    }
});

const openingHours = mongoose.model("openingHours", openingHoursSchema);
module.exports = openingHours;