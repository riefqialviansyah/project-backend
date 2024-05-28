const express = require("express");
const WordBankController = require("../controllers/WordBankController");
const router = express.Router();

router.post("/add", WordBankController.addWordBank);
router.get("/getWords", WordBankController.getAllWordBank);
router.delete("/deleteWord", WordBankController.deleteWord);

module.exports = router;
