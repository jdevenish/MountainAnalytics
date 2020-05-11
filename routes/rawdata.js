const express = require("express");
const router = express.Router();
const rawdataController = require("../controllers/rawdataController");


router.get('/', rawdataController.getData);

router.post('/create', rawdataController.addData);

module.exports = router;
