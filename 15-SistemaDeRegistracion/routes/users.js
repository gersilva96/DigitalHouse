var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

const uploadFileMiddleware = require("../middlewares/uploadFileMiddleware");

router.get("/login", userController.login); //GET - Login form
router.post("/login", userController.enter); //POST - Login method

router.get("/register", userController.register); //GET - Register form
router.post("/register", uploadFileMiddleware.uploadFile, userController.create); //POST - Register method

router.get('/profile/:email', userController.profile); //GET - Profile view

module.exports = router;
