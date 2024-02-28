const express = require("express")
const router = express.Router();
const fs = require('fs');
const carListRouter = require('../controllers/crud-carlist')

router.use(carListRouter)

module.exports = router;