let db = require('../database/models');
const bcrypt = require('bcryptjs');


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

    login: async (req, res) =>{
        const {email, password} = req.body;

        try{
            db.User.findOne({
                where:{
                    email
                }
            })
            .then(userToLogin =>{
                if(userToLogin){
                    let passwordUser = bcrypt.compareSync(password, userToLogin.password);
                    if(passwordUser){
                        return res.status(200).json({
                            user:'usuario logeado',
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



/*
    try{
            const user = await db.User.findOne({
                where:{
                    email,
                }
            });
            if(user){
                console.log(password)
                console.log( user.password)
            const passwordUser = await bcrypt.decrypt(password);
                console.log(passwordUser + "arriba")

                if(passwordUser === user.password){

                return res.status(200).json({
                    user: user,
                    data0: 'Inicio de sesion',
                    status:200,
                })
            }
            else {  
                return res.status(400).send({   
                    data1:'contraseña incorrecta',
                    status:400, 
                })
            }
        }else{ 
            return res.status(400).send({
                data2: 'no se encuentra el mail',
                data:400,
            }) }
        } catch(error){console.log(error)}
    }
*/