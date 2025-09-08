const express = require("express");
const router = express.Router();
const guacController = require("../controllers/guacController");

// Route for connecting system via Guacamole
router.get(
    "/connect/:systemid", 
    guacController.connectSystem
);

module.exports = router;
