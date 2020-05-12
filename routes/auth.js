const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const withAuth = require('../middleware');


// Validate user token
router.get('/checkToken', withAuth, authController.isValid);

// Authenticate user on login
router.post('/authenticate', authController.authenticateCredentials);

router.delete('/deleteAccount', withAuth, authController.deleteAccount);


module.exports = router;

