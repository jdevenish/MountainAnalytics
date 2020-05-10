const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const withAuth = require('../middleware');

// Update user's profile
router.put('/update', withAuth, userController.updateProfile);


module.exports = router;
