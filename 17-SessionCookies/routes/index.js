const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController");

/* GET home page. */
router.get('/', mainController.home);
router.post("/color", mainController.color);

module.exports = router;
