const express = require("express");
const router = express.Router();
const rawdataController = require("../controllers/rawdataController");


// Update user's profile
router.post('/create', rawdataController.addData);



module.exports = router;
