const express = require("express");
const router = express.Router();

const checkOutController = require('../controllers/checkOutController');

router.get("/", checkOutController.get);
router.post("/delivery", checkOutController.deliverOrder);
router.post("/pickUp", checkOutController.pickUpOrder);
router.post("/time", checkOutController.setTime);
router.get("/placeOrder", checkOutController.getOrder);
router.post("/placeOrder", checkOutController.setPayment);
router.post("/information", checkOutController.saveInfo);

module.exports = router;
