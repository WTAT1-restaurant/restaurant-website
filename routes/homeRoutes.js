const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get("/", (req, res) => {
    res.render("index", { title: "home" });
});

router.get("/chat", homeController.chat);

module.exports = router;
 