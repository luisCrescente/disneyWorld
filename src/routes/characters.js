const express = require('express');
const router = express.Router();
const controller = require('../controllers/characters')


router.get('/',controller.list);

module.exports = router