const express = require('express');
const router = express.Router();
const controller = require('../controllers/charactersController');
const upload = require('../middleware/characterImg');


router.get('/',controller.list);

// Obtengo todos los personajes por id
router.get('/:id', controller.detail);

// Creacion de personajes
router.post('/', upload.single('image') ,controller.create);

// Eliminacion de personajes
router.delete('/:id',controller.delete)

module.exports = router