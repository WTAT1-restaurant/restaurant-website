const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const randToken = require("rand-token");
 
const userSchema = new Schema({
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
        streetName: {
            type: String,
            required: true,
        },
        houseNumber: {
            type: Number,
            required: true,
        },
        addition: {
            type: String
        },
        zipCode: {
            type: Number,
            min: [10000, "Zip code too short"],
            max: 99999
        },
        city: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        lowercase: true
    },
    apiToken: {
        type: String
    }
});
userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});

// haven't figured out how to show the data
userSchema.virtual("fullAddress").get(function () {
    return `${this.address.streetName} ${this.address.houseNumber} ${this.address.zipCode}`;
});

// called before saving user data in the database
userSchema.pre("save", function (next) {
    let user = this;
    if (!user.apiToken) user.apiToken = randToken.generate(16);
    next();
});

module.exports = mongoose.model("User", userSchema);