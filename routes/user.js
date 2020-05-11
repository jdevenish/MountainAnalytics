const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const withAuth = require('../middleware');

// Update user's profile
router.post('/register', userController.registerNewUser);



module.exports = router;
