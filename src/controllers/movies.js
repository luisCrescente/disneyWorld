let db = require('../database/models')
const path = require('path');
const fs = require('fs');

let moviesController = {

    list:(req,res) =>{
        db.Movies
        .findAll()
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