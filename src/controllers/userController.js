require('dotenv').config();

let db = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


let userController = {

    /***** Registro de usuario *****/

    
    register: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            db.User.findOne({
                    where: {
                        email
                    }
                })
                .then((user) => {
                    if (user) {
                        return res.status(400).json({
                            user: 'el mail esta en uso',
                            error: 400,
                        })
                    } else {
                        db.User.create({
                                name,
                                email,
                                password: bcrypt.hashSync(password, 5),
                            })
                            .then(user => {
                                return res.status(200).json({
                                    data: user,
                                    created: 'usuario creado',
                                    status: 200,
                                })
                            }).catch(error => console.log(error))
                    }
                }).catch(error => console.log(error))
        } catch (error) { console.log(error) }
    },

    login: (req, res) =>{
        const {email, password} = req.body;

        try{
            db.User.findOne({
                where:{
                    email
                }
            })
            .then(user =>{
                if(user){
                    let passwordUser = bcrypt.compareSync(password, user.password);
                    if(passwordUser){
                        const expireToken = 420;
                            const token = jwt.sign({
                                data: email
                            }, 
                            process.env. JWT_KEY, 
                            {
                                expiresIn: expireToken
                            })
                        return res.status(200).json({
                            msg:`Bienvenido usuario:${user.name}`,
                            time: `El token expira en ${expireToken/60} min`,
                            token:token,
                            status:200
                        })
                    }else {
                        return res.status(400).json({
                            password:'la contraseña es incorrecta',
                            error:400
                        })
                    }
                } else {
                    return res.status(400).json({
                        email:'el mail no esta registrado',
                        status: 400
                    })
                }
            }).catch(error=>console.log(error))

        } catch (error) { console.log(error) }
    }

}

module.exports = userController;