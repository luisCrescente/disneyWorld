let db = require('../database/models');
const bcrypt = require('bcryptjs');


let userController = {

    /***** Registro de usuario *****/

    register: (req, res) =>{
        
            db.User.create({                                    
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),            
            })
            .then(user => {
                return  res.status(200).json({
                data: user,
                created: 'usuario creado',
                status:200,
            })
        }).catch(error=>console.log(error))
    },

    // login: async (req, res) =>{
        
    // }

}

module.exports = userController;