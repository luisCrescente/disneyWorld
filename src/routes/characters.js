const express = require('express');
const router = express.Router();
const controller = require('../controllers/charactersController')


router.get('/',controller.list);

module.exports = router