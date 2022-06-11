const { body } = require('express-validator');
const path = require('path');
const db = require('../database/models');

module.exports = [
    body('title')
        .isEmpty()
        .withMessage('El campo esta vacio')
        .bail(),


    body('rating')
        .notEmpty()
        .withMessage('Requerido')
        .bail()
        .isInt({ min: 1, max: 5 })
        .withMessage('Solo numeros entre el 1 y 5 para calificar'),
    
    
    body("genre_id")
        .notEmpty()
        .withMessage("Requerido")
        .bail()
        .isInt()
        .withMessage("Debe ser un Número"),

    
        body("release_date")
        .notEmpty()
        .withMessage("Requerido")
        .bail()
        .isDate()
        .withMessage("Debe ser una Fecha válida"),
];