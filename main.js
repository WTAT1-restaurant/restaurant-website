const express = require("express");

const mongoose = require('mongoose');
//const menu = require('./models/menu');

const menuController = require("./controllers/menuController");
const errorController = require("./controllers/errorController");
const cartController = require("./controllers/cartController");

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

// needed to load css in html: https://stackoverflow.com/a/54747432
// book page 119
app.use(express.static('public'));

// is needed to parse POST body
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.get("/", (req, res) => {
    //res.sendFile(__dirname + "/views/index.html");
    res.render("index");
});

// get menu item by ID
app.get("/menu/items/:itemId", menuController.getItem);

app.get("/menu", menuController.getMenu);

app.get("/about", (req, res) => {
    //res.sendFile(__dirname + "/views/menu.html");
    res.render("about");
});
// Shopping Cart

app.get("/cart", cartController.get);

app.post("/cart/add", cartController.addItem);

app.post("/cart/remove", cartController.removeItem);

app.post("/contact", (req, res) => {
    res.send("Contact information submitted successfully.");
});

// https://www.youtube.com/watch?v=pYj48mDXHBU
// get error to check if the 500 page will load
app.get("/error", (req, res) => res.send(error()));

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});

// error-handling middleware
app.use(errorController.respondInternalError);

// first draft: mongoose and mongo sandbox routes
//app.get('/add-menu', (req, res) => {
//  const menu = new menu({})
//} )
