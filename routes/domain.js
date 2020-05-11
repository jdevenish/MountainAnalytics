const express = require("express");
const router = express.Router();
const orgController = require("../controllers/organization");
const authController = require("../controllers/auth");
const domainController = require("../controllers/domain");
const withAuth = require('../middleware');


// Retrieve all domains for an org
router.get('/list', withAuth, domainController.getAll);

// Create new domain
router.post('/create', withAuth, domainController.createNew);

// Delete domain
router.delete('/remove', withAuth, domainController.remove);


module.exports = router;

