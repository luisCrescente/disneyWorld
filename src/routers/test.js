const express = require('express');
const router = express.Router();
const controller = require('../controllers/test')


router.get('/',controller.index);

module.exports = router