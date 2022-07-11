const express = require("express");
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// router.get("/", (req, res) => {
//     res.render("about", { title: "about" });
// });
router.get("/", aboutController.getOpeningHoursForRender);
router.get("/restaurant/hours", aboutController.getOpeningHours);
router.get("/restaurant/hours/:day", aboutController.getOpeningHourOnDay);
router.get("/restaurant/status", aboutController.getRestaurantStatus);
// in progress
router.post("/restaurant/open", aboutController.openRestaurant);
router.post("/restaurant/close", aboutController.closeRestaurant);

module.exports = router;