const express = require("express");
const router = express.Router();

// controller
const PortfolioController = require("../controllers/PortfolioController");

// endpoints
router.post("/send-me-mail", PortfolioController.sendMeMail);

module.exports = router;
