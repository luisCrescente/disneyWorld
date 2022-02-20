const express = require('express');
const router = express.Router();
const controller = require('../controllers/genresController');
const upload = require('../middleware/genreImg');

// Listado de genero
router.get('/',controller.list);

// Obtengo todos los generos por id
router.get('/:id', controller.detail);

// Creacion de generos
router.post('/', upload.single('image') ,controller.create);

module.exports = router