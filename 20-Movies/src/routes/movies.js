const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController");

const moviesValidation = require("../middlewares/moviesValidation");

router.get("/", moviesController.list);

router.get("/detail/:id", moviesController.detail);

router.get("/new", moviesController.new);

router.get("/recommended", moviesController.recommended);

router.get("/create", moviesController.create);
router.post("/create", moviesValidation, moviesController.store);

router.get("/edit/:id", moviesController.edit);
router.put("/edit/:id", moviesValidation, moviesController.update);

router.delete("/delete/:id", moviesController.delete);

module.exports = router;