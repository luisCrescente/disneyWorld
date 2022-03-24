const express = require('express');
const router = express.Router();
const sgMail = require('../services/sendGrid')
const controller = require('../controllers/userController');

// 
router.post('/register',controller.register);

//
router.post('/login',controller.login);

//

//


module.exports = router