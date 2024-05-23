const express = require("express");
const router = express.Router();

router.use("/portfolio", require("./portfolioRoute"));

module.exports = router;
