const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/moviesController');
const upload = require('../middleware/moviesImg');
const validMovie = require('../middleware/validMovies');



// Listado de todas las peliculas 
router.get('/',controller.list);

// Obtengo las peliculas por id
router.get('/:id', controller.detail);

// Creacion de peliculas
router.post('/', upload.single('image'), validMovie ,controller.create);

// Edicion de la pelicula
router.put('/:id', upload.single('image') ,controller.edit);

// Eliminacion de pelicula
router.delete('/:id',controller.delete)

module.exports = router