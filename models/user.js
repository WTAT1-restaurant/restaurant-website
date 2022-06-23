const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

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
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        lowercase: true
    }
});
userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

userSchema.pre("save", function (next) {     // add a pre hook to the user schema
    let user = this;

    bcrypt.hash(user.password, 10).then(hash => {  // hash the user's password
        user.password = hash;
        next();
    })
        .catch(error => {
            console.log(`Error in hashing password: ${error.message}`);
            next(error);
        });
});

userSchema.methods.passwordComparison = function (inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password); // compare the user password with the stored password
}

userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});

// haven't figured out how to show the data
userSchema.virtual("fullAddress").get(function () {
    return `${this.address.streetName} ${this.address.houseNumber} ${this.address.zipCode}`;
});

module.exports = mongoose.model("User", userSchema);