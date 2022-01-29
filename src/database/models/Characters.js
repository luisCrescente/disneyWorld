module.exports = function (sequelize, dataTypes) {
    let alias ='Characters';

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name:{
            type: dataTypes.STRING
        },

        image:{
            type: dataTypes.STRING
        },

        age:{
            type: dataTypes.INTEGER
        },

        weight:{
            type: dataTypes.INTEGER
        },

        history:{
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName:'characters',
        tiemestamps: false,
    };

    let Characters = sequelize.define(alias, cols, config);

    Characters.associate = function(models){
        Characters.belongsToMany(models.Movies, {
            
            as:'movies',
            through:'character_movie',
            foreingKey:'id_character',
            otherKey:'id_movie',
            tiemestamps: false,
        })
    };

    return Characters;
}