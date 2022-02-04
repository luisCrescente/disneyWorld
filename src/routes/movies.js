const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController')


router.get('/',controller.list);

module.exports = router