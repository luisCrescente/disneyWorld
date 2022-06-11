let db = require('../database/models')
const { Op } = require("sequelize");
const {validationResult} = require('express-validator');


let charactersController = {

    /***** Busca todas los personaje *****/
    
    list: async (req, res) =>{
        let allCharacters = await db.Characters.findAll({
            include: [ {association: 'movies'}],
            where: {
                name: {
                    [Op.substring]: req.query.name ? req.query.name : ''},

                age: {
                    [Op.substring]: req.query.age ? req.query.age : ''}
            }
            })
            try{
                if(allCharacters.length > 0){
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
                        //totalCharacters: getCharacters.length,
                        characters: getCharacters,
                        status:200
                    });
                }else {
                    res.status(400).json({
                        msg: 'No hay personajes en la base de datos',
                        error:400
                    })
                }
            } catch (err){console.log(err)}
    },


    /***** Busca un personaje por su ID *****/

        detail: async (req, res) =>{
            let oneCharacter = await db.Characters.findByPk(req.params.id,{
                include:[ {association: 'movies'} ]
            });
            try{
                if(oneCharacter){
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
                    };
                    res.status(200).json({
                        characters: character,
                        status:200
                    });
                }else {
                    return res.status(400).json({
                        msg:'No se encontro el personaje',
                        error: 400
                    })
                }
            }catch (err) {console.log(err)}
        },


    /***** Creacion de un personaje *****/
        
        create: (req, res) =>{
            let errors = validationResult(req);
            if (errors.isEmpty()){
                let {name, weight, age, history} = req.body;
                try{
                    db.Characters.findOne({
                        where:{
                            name: req.body.name,
                        }
                    })
                    .then(character =>{
                        if(character){
                            return res.status(400).json({
                                character: 'El personaje ya existe',
                                error: 400,
                            })
                        }else {
                            db.Characters.create({
                                include:[ {association: 'movies'} ],
                                ...req.body,
                                image: req.file != undefined ? req.file.filename :'noImage.jpg',
                            })
                            .then(character =>{
                                return res.status(200).json({
                                    data: character,
                                    created: 'Personaje creado',
                                    status:200
                                })
                            }).catch(error=>console.log(error));
                        }
                    }).catch(error=>console.log(error))

                } catch (err) {console.log(err) }
            }else {
                let error = {
                    status: 400,
                    errors:  errors.mapped(),
                };
                res.status(400).json(error)
            }
        },


    /***** Editar un personaje *****/

        edit: async (req, res) =>{

            const characterEdit = await db.Characters.findByPk(  req.params.id,{ 
                include: [ {association: 'movies'} ]
            })
            try{
                if(characterEdit){
                    characterEdit.update({
                        name: req.body.name != undefined ? req.body.name : characterEdit.name,
                        history: req.body.history != undefined ? req.body.history : characterEdit.history,
                        age: req.body.age != undefined ? req.body.age : characterEdit.age,
                        weight: req.body.weight != undefined ? req.body.weight : characterEdit.weight,
                        image: req.file != undefined ? req.file.filename : characterEdit.file,
                    })
                    .then (character =>{
                        return res.status(200).json({
                            data: character,
                            msg:'personaje editado',
                            status:200
                        })
                    }).catch(error=>console.log(error))
                }else{
                    res.status(400).json({
                        msg:'personaje no encontrado',
                        status:400
                    })
                }
            }catch (err) {console.log(err) }
        },


    /***** Elimina un personaje *****/
        
        delete: async (req, res) =>{
            const characters = await db.Characters.destroy({
                where:{
                    id:req.params.id
                }
            })
            try{
                characters ? 
                    res.status(200).json({
                    msg: 'Personaje borrado',
                    status:200
                }) :
                res.status(400).json({
                msg: 'Personaje no encontrado',
                status:400
            })
            } catch (err) {console.log(err) }
        }

}

module.exports = charactersController;