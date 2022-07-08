const express = require("express");
const router = express.Router();
const aboutController = require('../controllers/aboutController');

router.get("/", (req, res) => {
    res.render("about", { title: "about" });
});
router.get("/restaurant/hours", aboutController.getOpeningHours);
router.get("/restaurant/hours/:day", aboutController.getOpeningHourOnDay);

module.exports = router;