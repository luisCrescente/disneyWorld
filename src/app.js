const express = require('express');
const app = express();
const path = require('path');
const port = 3005;

/* Configuraciones */

app.use(
    express.static(path.resolve(__dirname, '../public'))
    );

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

    /* rutas APIs */

    const moviesRoutes = require('./routes/movies');
    const charactersRoutes = require('../src/routes/characters');
    const genresRoutes = require('../src/routes/genres'); 
    const userRoutes = require('../src/routes/user');
    const characterMovieRoutes= require('../src/routes/characterMovie');

    app.use('/movies', moviesRoutes);
    app.use('/characters',charactersRoutes);
    app.use('/genres',genresRoutes);
    app.use('/characterMovie',characterMovieRoutes);
    app.use('/auth', userRoutes);


    app.use((req, res) => {
        res.json({
            error: '-2',
            description: `ruta ${req.originalUrl} metodo ${req.method} no implementada` 
        });
    });


/* configuración del puerto*/

app.listen(port, ()=> 
    console.log('Servidor corriendo en el puerto ' + port)
)

