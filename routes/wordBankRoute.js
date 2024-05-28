const express = require("express");
const WordBankController = require("../controllers/WordBankController");
const router = express.Router();

router.post("/add", WordBankController.addWordBank);
router.get("/getWords", WordBankController.getAllWordBank);
router.delete("/deleteWord", WordBankController.deleteWord);
router.get("/dayPractice", WordBankController.dayPractice);

module.exports = router;
