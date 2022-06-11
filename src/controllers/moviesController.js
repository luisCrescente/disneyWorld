let db = require('../database/models');
const { Op } = require("sequelize");
const {validationResult} = require('express-validator');


let moviesController = {

     /***** Busca todas las peliculas *****/

    list: async (req,res) =>{
        let allMovies = await db.Movies.findAll({
            include: [ {association: 'genres'},  {association: 'characters'} ],
            where:{
                title: { 
                    [Op.substring]:req.query.title ? req.query.title : '' },
                    
                order:[ 
                    ['title', req.query.order && req.query.order.ToupperCase() == 'DESC' ? req.query.order : 'ASC'] ]
            }
        });   
            try {
                if(allMovies.length > 0){
                    getMovies = allMovies.map(movie => {  
                        movie = {
                            //id: movie.dataValues.id,
                            title: movie.dataValues.title,
                            release_date: movie.dataValues.release_date,
                            //rating: movie.dataValues.rating,
                            //genres: movie.genres.dataValues.name,
                            //characters:characters
                            image:`http://localhost:3005/img/moviesImg/${movie.dataValues.image}`
                        };
                        return movie;
                    });
                    res.status(200).json({
                        //totalMovies: getMovies.length,
                        movies: getMovies,
                        status: 200,
                    });
                }else {
                    res.status(400).json({
                        msg: 'No hay peliculas en la base de datos',
                        error:400
                    })
                }
            } catch (err) { console.log(err) };
        },

    
    /***** Busca una pelicula por su ID *****/

    detail: async (req,res) =>{

        let oneMovie = await db.Movies.findByPk(req.params.id, {
            include: [ {association: 'genres'}, {association: 'characters'} ]
        }); 
        try{    
            if(oneMovie){
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
            }else {
                return res.status(400).json({
                    msg:'No se encontro la pelicula',
                    error: 400
                })
            }

        }catch (err) { console.log(err) };
    },


     /***** Edición de pelicula  *****/

        edit: async (req, res) =>{

            const movieEdit = await db.Movies.findByPk( req.params.id,{
                include: [ { association: 'characters'}, {association: 'genres'} ]
                })
                try{
                    if(movieEdit){
                        movieEdit.update({
                            title: req.body.title != undefined ? req.body.title : movieEdit.title,
                            release_date: req.body.release_date != undefined ? req.body.release_date : movieEdit.release_date,
                            rating: req.body.rating != undefined ? req.body.rating : movieEdit.rating,
                            image: req.file != undefined ? req.file.filename : movieEdit.file,
                            id_genre: req.body.id_genre != undefined ? req.body.id_genre : movieEdit.id_genre,
                        })
                        .then(movie=>{
                            res.status(200).json({
                                data:movie,
                                msg:'Pelicula editada',
                                status:200
                            })
                        }).catch(error => console.log(error));
                        
                    }else{
                        res.status(400).json({
                            msg:'No se encontro la pelicula',
                            error:400
                        })
                    }
                }catch (err) { console.log(err) };
        },


    /***** Creación de pelicula  *****/

    create: (req,res) =>{ 
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let {title, rating, release_date, genre_id} = req.body;

            try {
                db.Movies.findOne({
                    where:{
                        title:req.body.title,
                    }
                })
                .then (movie => {
                    if(movie){
                        return res.status(400).json({
                            msg: 'La pelicula ya existe',
                            error:400
                        })
                    } else {
                        db.Movies.create({
                            inlcude: [{association: 'characters' },{association: 'genres' }],
                            ...req.body,
                            image: req.file != undefined ? req.file.filename :'noImage.jpg',
                        })
                        .then (movie =>{
                            return res.status(200).json({
                                msng: movie,
                                created: 'Pelicula creada',
                                status:200
                            })
                        }).catch(error => console.log(error));
                    }
                }).catch(error=>console.log(error))
                
            } catch (error) { console.log(error) };
        }else {
            let error = {
                status: 400,
                errors:  errors.mapped(),
            };
            res.status(400).json(error);
        }
    },


    /***** Eliminación de pelicula  *****/

    delete:async (req,res)=>{
        const movies = await db.Movies.destroy({
            where: {
                id: req.params.id
            }
        })
        try{
            movies ?
                res.status(200).json({
                    msg: 'Pelicula borrado',
                    status: 200,
                }) :
                res.status(400).json({
                    msg: "Pelicula no encontrada",
                    status: 400
                })
        }catch (error) { console.log(error) }
    }
}

module.exports = moviesController;
