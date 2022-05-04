const express = require("express");
const menuController = require("./controllers/menuController");

// express app
const app = express();

const port = 3000;

// listen for requests
// app.listen(3000);

app.set("view engine", "ejs");

// needed to load css in html: https://stackoverflow.com/a/54747432
app.use(express.static('public'));

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

app.post("/contact", (req, res) => {
    res.send("Contact information submitted successfully.");
});

app.get("/error", (req, res) => {
    throw Error('my error');
});

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
