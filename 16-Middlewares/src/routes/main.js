const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middlewares/adminMiddleware");

const mainController = require("../controllers/mainController");

router.get("/", mainController.home);

router.get("/ruta1", mainController.ruta1);

router.get("/ruta2", mainController.ruta2);

router.get("/ruta3", mainController.ruta3);

router.get("/admin", adminMiddleware, mainController.admin);

module.exports = router;