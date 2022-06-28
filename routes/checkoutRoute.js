const express = require("express");
const router = express.Router();

const checkOutController = require('../controllers/checkOutController');

router.get("/checkout", checkOutController.get);
// router.get("/checkout/placeOrder", checkOutController.getOrder);

router.post("/checkOut/delivery", checkOutController.deliverOrder);
router.post("/checkOut/pickUp", checkOutController.pickUpOrder);
router.post("/checkout/time", checkOutController.setTime);
router.post("/checkout/placeOrder", checkOutController.setPayment);
router.post("/checkout/information", checkOutController.saveInfo);

module.exports = router;
