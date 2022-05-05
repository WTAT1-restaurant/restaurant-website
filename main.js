const express = require("express");

const port = 3000;

const app = express();

const homeController = require("./controllers/homeController");

const layouts = require("express-ejs-layouts")

//let  application knows to expect EJS in your views folder
app.set("view engine", "ejs")

// needed to load css in html: https://stackoverflow.com/a/54747432
app.use(express.static("public"));

app.use(layouts);

// example of data in the database

// module.exports = {database};
//apllying MVC Design
app.get("/", homeController.sendIndex);

app.get("/menu/items", homeController.sendReqParamOfMenu);

app.get("/menu/items/:itemId", homeController.sendReqParamDataBase);

app.get("/menu", homeController.sendMenu);

app.post("/contact", (req, res) => {
  res.send("Contact information submitted successfully.");
});

//run
// app.get("/thank_you", homeController.respondWithName);
//using parameter
app.get("/menu/:extraID", homeController.respondWithExtra );
// app.get("/menu/:extraID", homeController.respondWithPrice)


app.get("/error", (req, res) => {
  throw Error("my error");
});

app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
});
