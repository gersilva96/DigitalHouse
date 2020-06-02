var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

const uploadFileMiddleware = require("../middlewares/uploadFileMiddleware");

//Rutas GET
router.get("/login", userController.login);
router.get("/register", userController.register);
router.get('/profile/:email', userController.profile);

//Rutas POST
router.post("/login", userController.login);
router.post("/register", uploadFileMiddleware.uploadFile, userController.create);

module.exports = router;
