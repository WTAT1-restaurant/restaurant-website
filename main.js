const express = require("express");

const mongoose = require('mongoose');
//const menu = require('./models/menu');

const menuController = require("./controllers/menuController");
const errorController = require("./controllers/errorController");

// express app
const app = express();
const port = 3000;
// listen for requests
// app.listen(3000);

// connect to mongodb database
// const dbURI = 'mongodb+srv://<username>:<password>@foodorder.enn28.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// maryna = p9Xn5MYjNaeklQMU
// joey = j5dfn2MQnuHjZGp5
// lana = UOwUBbYgUXhY1JQF
// elsya = tgTEGOOfLC8PLzEq

const dbURI = 'mongodb+srv://anni:i4eIB3sN6sAJ7pZP@foodorder.enn28.mongodb.net/FoodOrder?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`); }))
.catch((err) => console.log(err));

app.set("view engine", "ejs");

// needed to load css in html: https://stackoverflow.com/a/54747432
// book page 119
app.use(express.static('public'));

app.get("/", (req, res) => {
    //res.sendFile(__dirname + "/views/index.html");
    res.render("index");
});

// get menu item by ID
app.get("/menu/items/:itemId", menuController.getItem);

app.get("/menu", menuController.getMenu);

// Not needed anymore as well as veggie.ejs
// Replaced with vegetarian=true query parameter for /menu route in menuController
app.get("/veggie", (req, res) => {
  const veggie = [
     { "id": 4, "title": "Avocado Nigiri", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/afd770b8-6566-11eb-a08c-0a89d2884f48_avocadonigiri.jpeg", "price": 5.00, "weight": 30, "fats": 1.33, "carbohydrates": 35.10, "calories": 120.00},
     { "id": 5, "title": "Avocado Nigiri", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/99c84496-6566-11eb-9bfa-fe9c1eb06953_inari.jpeg", "price": 4.50, "weight": 56, "fats": 2.33, "carbohydrates": 41.10, "calories": 134.00 },
  ];
    res.render("veggie", {title: "Vegetarian", veggie });
});

app.get("/about", (req, res) => {
    //res.sendFile(__dirname + "/views/menu.html");
    res.render("about");
});

app.post("/contact", (req, res) => {
    res.send("Contact information submitted successfully.");
});

// app.get("/error", (req, res) => {
//     throw Error('my error');
// });

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
