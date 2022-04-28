const express = require("express");

const port = 3000;

const app = express();

// example of data in the database
let database = {
    "1" : { "id": 1, "title": "Nigiri with tuna" },
    "2" : { "id": 2, "title": "Nigiri with salmon" }
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/menu/items", (req, res) => {
    let response = {
        "items": [
            { "id": 1, "title": "Nigiri with tuna" },
            { "id": 2, "title": "Nigiri with salmon" }
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

app.get("/description", (req, res) => {
    res.sendFile(__dirname + "/views/description.html");
});

app.post("/contact", (req, res) => {
    res.send("Contact information submitted successfully.");
});

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
