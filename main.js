// i tried to implement controller from lesson 9 on our project
// require the homeController.js to main.js
const homeController = require("./controllers/homeController");

const express = require("express");

const port = 3000;

const app = express();

// example of data in the database
let database = {
    "1" : { "id": 1, "title": "Maguro Nigiri", Weight: "38 gr.", Fats: "2.90 gr.", Carbohydrates: "37.40 g.", Calories: "232.00"},
    "2" : { "id": 2, "title": "Ikura Nigiri", Weight: "36 gr.", Fats: "1.40 gr.", Carbohydrates: "37.10 g.", Calories: "197.00" }
}

// try to change this code to implement the controller
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/views/index.html");
// });

app.get("/", homeController.homePage);

app.get("/menu/items", (req, res) => {
    let response = {
        "items": [
            { "id": 1, "title": "Maguro Nigiri" },
            { "id": 2, "title": "Ikura Nigiri" }
        ]
    };
    res.send(response);
});

app.get("/menu/items/:itemId", (req, res) => {
    let response = {
        "item": database[req.params.itemId]
    };
    res.send(response);
});

app.get("/menu", (req, res) => {
    res.sendFile(__dirname + "/views/menu.html");
});

app.post("/contact", (req, res) => {
    res.send("Contact information submitted successfully.");
});

app.get("/error", (req, res) => {
    throw Error('my error');
});

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
