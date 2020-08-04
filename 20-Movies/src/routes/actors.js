const express = require("express");
const router = express.Router();

const actorsController = require("../controllers/actorsController");

const actorsValidation = require("../middlewares/actorsValidation");

router.get("/", actorsController.list);

router.get("/detail/:id", actorsController.detail);

router.get("/recommended", actorsController.recommended);

router.get("/create", actorsController.create);
router.post("/create", actorsValidation, actorsController.store);

router.get("/edit/:id", actorsController.edit);
router.put("/edit/:id", actorsValidation, actorsController.update);

router.delete("/delete/:id", actorsController.delete);

module.exports = router;