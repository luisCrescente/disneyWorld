let db = require('../database/models')
const path = require('path');


let moviesController = {

    list:(req,res) =>{
        db.Movies
        .findAll({include:[{association: 'genres'}]})
       .then(movies => {
           return res.status(200).json({
               total: movies.length,
               status:200,
               
           })
       }).catch(function(err){

           console.log(err);
       })
    }

}

module.exports = moviesController;
