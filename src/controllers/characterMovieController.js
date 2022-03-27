let db= require('../database/models');


let characterMovie = {

    create:(req,res) =>{
        db.CharacterMovie.create({
            ...req.body
        })
        .then( characterMovie =>{
            return res.status(200).json({
                data:characterMovie,
                status:200,
            })
        }).catch(error=>console.log(error))
    },
    

    delete: (req,res) =>{
        db.CharacterMovie.destroy({
            where:{
                id: req.params.id,
            }
        })
        .then(characterMovie=>{
            return res.status(200).json({
                data:characterMovie,
                deleted:'borrado',
                status:200
            })
        }).catch(error=>console.log(error));
    }

}

module.exports = characterMovie;