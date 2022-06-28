const express = require("express");
const router = express.Router();

router.post("/contact", (req, res) => {
    res.send("Contact information submitted successfully.");
});

module.exports = router;
