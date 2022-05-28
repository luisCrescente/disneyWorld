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
    

        
    delete: async (req, res) =>{
        const charactersMovies = await db.CharacterMovie.destroy({
            where:{
                id:req.params.id
            }
        })
        try{
            charactersMovies ? 
                res.status(200).json({
                msg: 'relacion borrado',
                status:200
            }) :
            res.status(400).json({
            msg: 'relacion no encontrado',
            status:400
        })
        } catch (err) {console.log(err) }
    }

}

module.exports = characterMovie;