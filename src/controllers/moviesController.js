let db = require('../database/models')
const path = require('path');


let moviesController = {

     /***** Busca todas las peliculas *****/

    list: async (req,res) =>{
        let allMovies = await db.Movies.findAll({
            include: [
                {association: 'genres'},
                {association: 'characters'}
            ]
        });   
            try {
                getMovies = allMovies.map(movie => {  
                    movie = {
                        id: movie.dataValues.id,
                        title: movie.dataValues.title,
                        release_date: movie.dataValues.release_date,
                        rating: movie.dataValues.rating,
                        genres: movie.genres.dataValues.name,
                        //characters:characters
                        image:`http://localhost:3005/img/moviesImg/${movie.dataValues.image}`
                    };
                    return movie;
                });
                res.status(200).json({
                    totalMovies: getMovies.length,
                    movies: getMovies,
                    status: 200,
                });
            } catch (err) {
                console.log(err);
        
            };
        },

    
    /***** Busca una pelicula por su ID *****/

    detail: async (req,res) =>{

        let oneMovie = await db.Movies.findByPk(req.params.id, {
            include: [
                {association: 'genres'},
                {association: 'characters'}
            ]
        }); 
        try{
                delete oneMovie.dataValues.genre_id;      
                let characters = [];                
                    oneMovie.characters.forEach(character => {
                    characters.push(character.dataValues.name);
                });

                let movie = {
                    id: oneMovie.id,
                    title: oneMovie.title,
                    rating: oneMovie.rating,
                    image:`http://localhost:3005/img/moviesImg/${oneMovie.dataValues.image}`,
                    release_date: oneMovie.release_date,
                    characters: characters,
                    genres: oneMovie.genres.dataValues.name
                };
                res.status(200).json({
                    movies: movie,
                    status: 200,
                });
        }catch (err) {
                console.log(err);
            };
    }
}

module.exports = moviesController;