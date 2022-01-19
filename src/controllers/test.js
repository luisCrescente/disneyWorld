const path = require('path');
const fs = require('fs');

let mainController = {

    index: function(req,res){
        res.render('home');
    }

}

module.exports = mainController;