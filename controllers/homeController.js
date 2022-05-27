module.exports = { 
  
  sendIndex : (req, res) => {
  res.render("page");
},

//   sendReqParamOfMenu : (req, res) => {
//   let response = {
//     items: [
//       { id: 1, title: "Maguro Nigiri" },
//       { id: 2, title: "Ikura Nigiri" },
//     ],
//   };
//   res.send(response);
// },

// const { database } = require("../main.js");
// let database = {
//   1: {
//     id: 1,
//     title: "Maguro Nigiri",
//     Weight: "38 gr.",
//     Fats: "2.90 gr.",
//     Carbohydrates: "37.40 g.",
//     Calories: "232.00",
//   },
//   2: {
//     id: 2,
//     title: "Ikura Nigiri",
//     Weight: "36 gr.",
//     Fats: "1.40 gr.",
//     Carbohydrates: "37.10 g.",
//     Calories: "197.00",
//   },
// };
// exports.sendReqParamDataBase = (req, res) => {
//   let response = {
//     item: database[req.params.itemId],
//   };
//   res.send(response);
// };
  sendMenu : (req, res) => {
  res.sendFile(__dirname + "/views/menu.html");
},

// exports.respondWithName = (req, res) => {
//     res.render("index");
//     };

// let extraIngredients = {
//   "soySauce": {
//     costs: "0.5$",
//   },
//   "slicedAlmonds": {
//     costs: "1$",
//   },
//   "sesameSeeds": {
//     costs: "2$",
//   }
// },

// exports.respondWithExtra = (req, res) => {

//   // let price  = {
//   //   item: extraIngredients[req.params.price ],
//   // };

//   let extraIn  = req.params.extraID;
//   res.render("index", { Ingredients: extraIn });
//   }

};

  
// exports.respondWithPrice = (req, res) => {

//   let extraIn  = req.params.extraID;

//   res.render("index", {price: extraIn });
//   };