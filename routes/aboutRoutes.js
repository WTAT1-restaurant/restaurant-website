const express = require("express");
const router = express.Router();
const aboutController = require('../controllers/aboutController');


router.get("/", aboutController.getOpeningHoursForRender);
router.get("/restaurant/hours", aboutController.getOpeningHours);
router.get("/restaurant/hours/:day", aboutController.getOpeningHourOnDay);
router.get("/restaurant/status", aboutController.getRestaurantStatus);
module.exports = router;