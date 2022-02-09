const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController');
const path = require('path')
const upload = require('../middleware/moviesImg');



// Listado de todas las peliculas 
router.get('/',controller.list);

// Obtengo las peliculas por id
router.get('/:id', controller.detail);

// Creacion de peliculas
router.post('/', upload.single('image') ,controller.create);

// Eliminacion de pelicula
router.delete('/:id',controller.delete)

module.exports = router