const { body } = require('express-validator');
const path = require('path');
const db = require('../database/models');

module.exports = [
    body('name')
        .notEmpty()
        .withMessage('El campo no puede estar vacio')
        .bail()
        .isLength({max : 200}).withMessage('Limite de caracteres excedido'),

    
    body('age')
        .notEmpty()
        .withMessage('El campo no puede estar vacio')
        .bail()
        .isInt()
        .withMessage('Debe ser un numero'),


    body('weight')
        .notEmpty()
        .withMessage('El campo no puede estar vacio')
        .bail()
        .isInt()
        .withMessage('Debe ser un numero'),


    body('history')
        .notEmpty()
        .withMessage('El campo no puede estar vacio')
        .bail()
        .isLength({max : 500})
        .withMessage('Limite de caracteres excedido'),
];