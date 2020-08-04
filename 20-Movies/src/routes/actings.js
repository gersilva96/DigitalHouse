const express = require("express");
const router = express.Router();

const actingsController = require("../controllers/actingsController");

const actingValidation = require("../middlewares/actingValidation");

router.get("/add", actingsController.add);
router.post("/add", actingValidation, actingsController.store);

router.get("/delete", actingsController.delete);
router.delete("/delete",actingValidation, actingsController.destroy);

module.exports = router;