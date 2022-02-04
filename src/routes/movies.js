const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController')

// Listado de todas las peliculas 
router.get('/',controller.list);

// Obtengo las peliculas por id
router.get('/:id', controller.detail);

module.exports = router