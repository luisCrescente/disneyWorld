let db = require('../database/models')
const path = require('path');



let genresController = {

     /***** Busca todos los generos *****/

    list: async (req,res) =>{
        let allGenres = await db.Genre.findAll({
            include: [ {association: 'movies'} ]
        })
            try{
                getGenres = allGenres.map(genre =>{
                    genre ={
                        id: genre.dataValues.id,
                        name: genre.dataValues.name,
                        image:`http://localhost:3005/img/genreImg/${genre.dataValues.image}`,
                    }
                    return genre
                })
                    res.status(200).json({
                        genres: getGenres,
                        status:200,
                    });
            } catch (err) { console.log(err) };
        },



     /***** Busca los generos por ID *****/
    
    detail: async (req,res) =>{
        let oneGenre = await db.Genre.findByPk(req.params.id)

        try{
            let genre ={
                id: oneGenre.dataValues.id,
                name: oneGenre.dataValues.name,
                image:`http://localhost:3005/img/genreImg/${oneGenre.dataValues.image}`,
            }
            res.status(200).json({
                genre : genre,
                status:200,
            })
        }catch (err) { console.log(err) };
    },
    
    
    /***** Creacion de genero *****/

    create: (req,res) =>{
        try{
            db.Genres.findOne({
                where:{
                    name: req.body.name
                }
            })
            .then(genre =>{
                if(genre){
                    return res.status(400).json({
                        msg:'el genero se encuentra repetido',
                        error:400
                    })
                }else{

                    db.Genres.create({
                        include:[{ association: 'genres' }],
                        ...req.body,
                        image: req.file != undefined ? req.file.filename :'noImage.jpg',
                    })
                    .then( genre =>{
                        return res.status(200).json({
                            msg: genre,
                            created:'genero creado',
                            status:200
                        })
                    }).catch(error=>console.log(error));
                }
            }).catch(error=>console.log(error));
        } catch (err) { console.log(err) };
    }
}

module.exports = genresController;