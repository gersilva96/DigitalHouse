var express = require('express');
var router = express.Router();
const gastosController = require("../controllers/gastosController");

/* GET home page. */
router.get('/', gastosController.render);

module.exports = router;
