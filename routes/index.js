const express = require("express");
const router = express.Router();

// Router
const cartRoutes = require('./cartRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const contactRoutes = require('./contactRoutes');
const apiRoutes = require("./apiRoutes");
const errorRoutes = require('./errorRoutes');
const menuRoutes = require('./menuRoutes');
const aboutRoutes = require('./aboutRoutes');
const userRoutes = require('./userRoutes');
const homeRoutes = require('./homeRoutes');



// Matching router 
router.use('/cart', cartRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/contact', contactRoutes);
router.use('/menu', menuRoutes);
router.use('/users', userRoutes);
router.use('/about', aboutRoutes);
router.use("/api", apiRoutes);
router.use('/', homeRoutes);
router.use('/', errorRoutes);


module.exports = router;
 