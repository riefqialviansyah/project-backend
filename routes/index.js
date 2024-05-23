const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my API",
    createdBy: "Riefqi Alviansyah",
    github: "https://github.com/riefqialviansyah",
    readme: "https://github.com/riefqialviansyah/project-backend",
  });
});

router.use("/portfolio", require("./portfolioRoute"));

module.exports = router;
