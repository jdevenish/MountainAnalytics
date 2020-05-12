const express = require("express");
const router = express.Router();
const metricsController = require("../controllers/metrics")
const withAuth = require('../middleware');

router.get('/', withAuth, metricsController.getForDomain);

module.exports = router;

