const MenuItem = require("../models/menuItem");

// example of data in the database

// let database = [
//     new MenuItem({ "id": 1, "vegetarian": false, "title": "Maguro Nigiri", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/d4c35348-66c8-11eb-9787-2242c94d6bb2_101_maguronigiri.jpeg", "price": 3.50, "weight": 38, "fats": 2.90, "carbohydrates": 37.40, "calories": 232.00 }),
//     new MenuItem({ "id": 2, "vegetarian": false, "title": "Ikura Nigiri", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/00836fc2-66c9-11eb-b1e9-1af7a293cf79_112_ikuranigiri.jpeg", "price": 3.00, "weight": 36, "fats": 1.40, "carbohydrates": 37.10, "calories": 197.00 }),
//     new MenuItem({ "id": 3, "vegetarian": false, "title": "Temaki Sake", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/904121a2-66cb-11eb-b613-16c4eaa0dc27_148_temakisake.jpeg", "price": 7.00, "weight": 60, "fats": 2.90, "carbohydrates": 62.10, "calories": 300.00 }),
//     new MenuItem({ "id": 4, "vegetarian": true, "title": "Avocado Nigiri", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/afd770b8-6566-11eb-a08c-0a89d2884f48_avocadonigiri.jpeg", "price": 5.00, "weight": 30, "fats": 1.33, "carbohydrates": 35.10, "calories": 120.00 }),
//     new MenuItem({ "id": 5, "vegetarian": true, "title": "Inari sushi", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/99c84496-6566-11eb-9bfa-fe9c1eb06953_inari.jpeg", "price": 4.50, "weight": 56, "fats": 2.33, "carbohydrates": 41.10, "calories": 134.00 }),
//     new MenuItem({ "id": 6, "vegetarian": false, "title": "Inari sushi", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/5d8893aa-66c9-11eb-8f22-8eaab0637613_144_sakekappamaki.jpeg", "price": 5.00, "weight": 120, "fats": 12.45, "carbohydrates": 103.00, "calories": 260.00 })
// ]

// save data in mongodb

// database.forEach(menuItem => {
//     menuItem.save((error, savedDocument) => {
//         if (error) console.log(error);
//         console.log(savedDocument);
//     });
// });

exports.getItem = (req, res) => {
    // create a query to find a menu item by ID
    var query = MenuItem.findOne({
        id: req.params.itemId
    });
    // execute query
    query.exec((error, data) => {
        if (data) {
            res.render("item", { "item": data });
        }
    });
}

exports.getMenu = (req, res) => {
    let veggie = req.query.vegetarian;

    if (veggie == 'true') {
        // create a query to find vegetarian menu items
        var query = MenuItem.find({
            vegetarian: true
        });
        query.exec((error, data) => {
            if (data) {
                res.render("menu", { "items": data, "vegetarian": true });
            }
        });
    } else {
        // create a query to find all menu items
        var query = MenuItem.find({});
        query.exec((error, data) => {
            if (data) {
                res.render("menu", { "items": data });
            }
        });
    }
}
