const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const router = express.Router();
const mongoose = require('mongoose');
//const menu = require('./models/menu');

const menuController = require("./controllers/menuController");
const errorController = require("./controllers/errorController");
const cartController = require("./controllers/cartController");
const checkOutController = require("./controllers/checkOutContoller");


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

// is needed to parse POST body
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());

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

// https://www.youtube.com/watch?v=pYj48mDXHBU
// get error to check if the 500 page will load
// router.get("/error", (req, res) => res.send(error()));

// router.use((req, res) => {
//     res.status(404).render("404", { title: "404" });
// });

// error-handling middleware
router.use(errorController.respondInternalError);
router.use(errorController.pageNotFoundError);

// first draft: mongoose and mongo sandbox routes
//router.get('/add-menu', (req, res) => {
//  const menu = new menu({})
//} )

app.use("/", router);
