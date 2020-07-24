const express = require('express');
const router = express.Router();

const actorsController = require('../controllers/actorsController');

router.get("/", actorsController.list);

router.get("/detail/:id", actorsController.detail);

router.get("/recommended", actorsController.recommended);

router.get("/search", actorsController.search);

module.exports = router;