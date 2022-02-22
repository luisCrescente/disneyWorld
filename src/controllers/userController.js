let db = require('../database/models');
const bcrypt = require('bcryptjs');


let userController = {

    /***** Registro de usuario *****/

    register: async (req, res) =>{
        const {to, subject, text, html, sadboxMode = false} = req.body;

        const msg = {
            to,
            from: 'ponermail',
            subject,
            text,
            html,
            settings:{
                sandbox_mode:{
                    enable: sadboxMode
                }
            }
        };
        try{
            await sgMail.send(msg);
        }catch (err) {
            return res.status(err.code).send(
                err.message
            )};
    },

    login: async (req, res) =>{
        
    }

}

module.exports = userController;