const express = require("express");
const router = express.Router();

const errorController = require('../controllers/errorController');

// https://www.youtube.com/watch?v=pYj48mDXHBU
// error-handling middleware
router.use(errorController.respondInternalError);
router.use(errorController.pageNotFoundError);

module.exports = router;
