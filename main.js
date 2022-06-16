const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const router = express.Router();
const mongoose = require('mongoose');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

//const menu = require('./models/menu');

// middleware that interprets requests according to a specific query parameter and HTTP method
const methodOverride = require("method-override");

const menuController = require("./controllers/menuController");
const errorController = require("./controllers/errorController");
const cartController = require("./controllers/cartController");
const checkOutController = require("./controllers/checkOutController");
const usersController = require("./controllers/usersController");


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
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`); }))
.catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(expressLayouts);

// needed to load css in html: https://stackoverflow.com/a/54747432
// book page 119
router.use(express.static('public'));

// methodOverride middleware configuration
router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

// is needed to parse POST body
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());

// Set Cookie Parser
router.use(cookieParser('SecretCookies'));
router.use(session({
    secret: "SecretCookies",
    cookie: {maxAge: 4000000},
    resave: false,
    saveUninitialized: false
}));

router.use(flash());

// Middleware to associate connectFlash to flashes on response
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

router.get("/", (req, res) => {
    //res.sendFile(__dirname + "/views/index.html");
    res.render("index", {title: "home page"});
});

router.get("/about", (req, res) => {
    //res.sendFile(__dirname + "/views/menu.html");
    res.render("about", {title: "about"});
});

// get menu item by ID
router.get("/menu/items/:itemId", menuController.getItem);

router.get("/menu", menuController.getMenu);

// page for the restaurant
router.get("/restaurant", menuController.getRestaurantMenu);

router.post("/menu/items", menuController.addNewItem, menuController.redirectView);

router.post("/menu/items/:itemId/update", menuController.update, menuController.redirectView);

router.post("/menu/items/:itemId/delete", menuController.deleteMenuItem, menuController.redirectView);

// shopping Cart
router.get("/cart", cartController.get);

router.get("/API/cart", cartController.countBasketItems);

router.post("/cart/add", cartController.addItem);

router.post("/cart/remove", cartController.removeItem);

router.get("/checkout", checkOutController.get);

router.post("/checkOut/delivery", checkOutController.deliverOrder);

router.post("/checkOut/pickUp", checkOutController.pickUpOrder);
router.post("/checkout/time", checkOutController.setTime);
// router.post("/checkout/information", infoController.saveInfo);
router.post("/checkout/information", checkOutController.saveInfo);

router.post("/contact", (req, res) => {
    res.send("Contact information submitted successfully.");
});

router.post("/menu/items", menuController.addNewItem);

// Users
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

// https://www.youtube.com/watch?v=pYj48mDXHBU
// error-handling middleware
router.use(errorController.respondInternalError);
router.use(errorController.pageNotFoundError);

// first draft: mongoose and mongo sandbox routes
//router.get('/add-menu', (req, res) => {
//  const menu = new menu({})
//} )

app.use("/", router);
