const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const passport = require("passport");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const router = require("./routes/index");
const User = require('./models/user');
// middleware that interprets requests according to a specific query parameter and HTTP method
const methodOverride = require("method-override");
// express app
const app = express();
const port = 3000;

// connect to mongodb database
// const dbURI = 'mongodb+srv://<username>:<password>@foodorder.enn28.mongodb.net/FoodOrder?retryWrites=true&w=majority'
// maryna = p9Xn5MYjNaeklQMU
// joey = j5dfn2MQnuHjZGp5
// lana = UOwUBbYgUXhY1JQF
// elsya = tgTEGOOfLC8PLzEq
// anni = i4eIB3sN6sAJ7pZP

const dbURI = 'mongodb+srv://anni:i4eIB3sN6sAJ7pZP@foodorder.enn28.mongodb.net/FoodOrder?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port, () => {
        console.log(`The Express.js server has started and is listening on port number: ${port}`);
    }))
    .catch((err) => console.log(err));

app.set("token", process.env.TOKEN || "OUR_API_TOKEN");
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// needed to load css in html: https://stackoverflow.com/a/54747432
// book page 119
app.use(express.static('public'));
app.use(expressLayouts);
// is needed to parse POST body
app.use(
    express.urlencoded({
        extended: false
    })
);
// methodOverride middleware configuration
app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
app.use(express.json());
// Set Cookie Parser
app.use(cookieParser('SecretCookies'));
app.use(session({
    secret: "SecretCookies",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
// Add information about the user and whether he is logged in or not
app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});
// Middleware to associate connectFlash to flashes on response
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
app.use("/", router);
