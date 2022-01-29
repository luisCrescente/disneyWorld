let db = require('../database/models')
const path = require('path');
const fs = require('fs');

let mainController = {

    index: function(req,res){
        db.Genre.findAll()
        .then(function(genre){
            return res.render('home',{genre})
        })
     }

}

module.exports = mainController;