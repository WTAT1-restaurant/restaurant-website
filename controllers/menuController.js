// example of data in the database
let database = [
    { "id": 1, "title": "Maguro Nigiri", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/d4c35348-66c8-11eb-9787-2242c94d6bb2_101_maguronigiri.jpeg", "price": 3.50, "weight": 38, "fats": 2.90, "carbohydrates": 37.40, "calories": 232.00 },
    { "id": 2, "title": "Ikura Nigiri", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/00836fc2-66c9-11eb-b1e9-1af7a293cf79_112_ikuranigiri.jpeg", "price": 3.00, "weight": 36, "fats": 1.40, "carbohydrates": 37.10, "calories": 197.00 },
    { "id": 3, "title": "Temaki Sake", "image": "https://imageproxy.wolt.com/menu/menu-images/6019324568bc6b99044013c5/904121a2-66cb-11eb-b613-16c4eaa0dc27_148_temakisake.jpeg", "price": 7.00, "weight": 60, "fats": 2.90, "carbohydrates": 62.10, "calories": 300.00}
]

exports.getItem = (req, res) => {
    // https://stackoverflow.com/a/35398031
    let item = database.find(x => x.id == req.params.itemId);
    res.render("item", { "item": item });
}

exports.getMenu = (req, res) => {
    res.render("menu", { items: database });
}
