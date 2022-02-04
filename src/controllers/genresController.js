let db = require('../database/models')
const path = require('path');
const Op = db.Sequelize.Op


let genresController = {

    list:(req,res) =>{
         db.Genre
         .findAll()
        .then(genres => {
            return res.status(200).json({
                total: genres.length,
                status:200,
                
            })
        }).catch(function(err){

            console.log(err);
        })
     }

}

module.exports = genresController;