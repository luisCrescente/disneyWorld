let db = require('../database/models')
const path = require('path');
const Op = db.Sequelize.Op


let charactersController = {

    /***** Busca todas los personaje *****/
    
    list: async (req, res) =>{
        let allCharacters = await db.Characters.findAll()
            try{
                getCharacters = allCharacters.map( character =>{
                    character = {
                        //id: character.dataValues.id,
                        name: character.dataValues.name,
                        image: `http://localhost:3005/img/charactersImg/${character.dataValues.image}`,
                        //history: character.dataValues.history,
                        //age: character.dataValues.age
                    };
                    return character;
                });
                res.status(200).json({
                    characters: getCharacters,
                    status:200
                });
            } catch (err){console.log(err)}
    },


    /***** Busca un personaje por su ID *****/

        detail: async (req, res) =>{
            let oneCharacter = await db.Characters.findByPk(req.params.id,{
                include:[
                    {association: 'movies'}
                ]
            });
            try{
                let movies = [];
                    oneCharacter.movies.forEach(movie =>{
                        movies.push(movie.dataValues.title);
                    });

                let character ={
                    id: oneCharacter.dataValues.id,
                    name: oneCharacter.dataValues.name,
                    history: oneCharacter.dataValues.history,
                    age: oneCharacter.dataValues.age,
                    weight: oneCharacter.weight,
                    movies: movies,
                    image: `http://localhost:3005/img/charactersImg/${oneCharacter.dataValues.image}`
                }
                res.status(200).json({
                    characters: character,
                    status:200
                });
            }catch (err) {console.log(err)}
        },


    /***** Creacion de un personaje *****/
        
        create: (req, res) =>{
            db.Characters.create({
                include:[
                    {association: 'movies'}
                ],
                ...req.body,
                image:req.file.filename,
            })
            .then(character =>{
                return res.status(200).json({
                    data: character,
                    status:200,
                    created: 'ok'
                })
            }).catch(error=>console.log(error))
        },


    /***** Editar un personaje *****/

            edit: async (req, res) =>{

                db.Characters.findByPk(  req.params.id,{name, history, weight, age, image}  = req.body,{ include: [
                        {association: 'movies'}
                ]})
                    .then(character =>{
                        let image

                        if( !req.file || !character.image ){
                            image = 'noImage.jpg';
                        } else {
                            image = req.file.filename;
                        };

                        character.update({
                            name,
                            history,
                            weight,
                            age,
                            image,
                        })
                        res.status(200).json({
                            data: character,
                            edited: 'personaje editada',
                            status:200,
                        })  

                    }).catch(error=>console.log(error))   

            },


    /***** Elimina un personaje *****/
        
        delete:(req, res) =>{
            db.Movies.destroy({
                where:{
                    id:req.params.id
                }
            })
            .then((character) => {
                return res.status(200).json({
                    response: character,
                    deleted: 'personaje borrado',
                    status:200
                });
            });
        }

}

module.exports = charactersController;