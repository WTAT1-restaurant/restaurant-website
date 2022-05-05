const express = require("express");
const menuController = require("./controllers/menuController");
const errorController = require("./controllers/errorController");

// express app
const app = express();

const port = 3000;

// listen for requests
// app.listen(3000);

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

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
