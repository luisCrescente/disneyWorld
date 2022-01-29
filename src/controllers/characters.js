let db = require('../database/models')
const path = require('path');
const Op = db.Sequelize.Op


let charactersController = {

    list:(req,res) =>{
         db.Characters
         .findAll()
        .then(characters => {
            return res.status(200).json({
                total: characters.length,
                status:200,
                
            })
        }).catch(function(err){

            console.log(err);
        })
     }

}

module.exports = charactersController;