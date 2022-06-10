const mongoose = require("mongoose"),
{Schema} = mongoose,

userSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true,
            trim: true
        },
        last: {
            type: String,
            required: true,
            trim: true
        }
    },
    address: {
        // streetName: {
        //     type: String,
        //     required: true,
        // },
        // houseNumber: {
        //     type: Number,
        //     required: true,
        // },
        // addition: {
        //     type: String
        // },
        zipCode: {
            type: Number,
            min: [10000, "Zip code too short"],
            max: 99999
        },
        // city: {
        //     type: String,
        //     required: true,
        // }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
});

userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});

// TODO add user schema for address

module.exports = mongoose.model("User", userSchema);