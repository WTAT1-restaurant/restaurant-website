const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    //res.sendFile(__dirname + "/views/index.html");
    res.render("index", { title: "home" });
});

module.exports = router;
