const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const router = express.Router();
const mongoose = require('mongoose');

const passport = require("passport");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


// middleware that interprets requests according to a specific query parameter and HTTP method
const methodOverride = require("method-override");

// express app
const app = express();
const port = 3000;

// Router
const cartRouter = require('./routes/cartRoute');
const checkoutRouter = require('./routes/checkoutRoute');
const contactRouter = require('./routes/contactRoute');
const errorRouter = require('./routes/errorRoute');
const indexRouter = require('./routes/index');
const menuRouter = require('./routes/menuRoute');
const userRouter = require('./routes/userRoute');


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

app.set("view engine", "ejs");
app.use(expressLayouts);

// needed to load css in html: https://stackoverflow.com/a/54747432
// book page 119
router.use(express.static('public'));

// Set Cookie Parser
router.use(cookieParser('SecretCookies'));
router.use(session({
    secret: "SecretCookies",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());


// Matching router 
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/contact', contactRouter);
app.use('/404', errorRouter);
app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/user', userRouter);


// is needed to parse POST body
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());

router.use(flash());

// methodOverride middleware configuration
router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

// Middleware to associate connectFlash to flashes on response
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});


router.get("/about", (req, res) => {
    //res.sendFile(__dirname + "/views/menu.html");
    res.render("about", { title: "about" });
});

app.use("/", router);
