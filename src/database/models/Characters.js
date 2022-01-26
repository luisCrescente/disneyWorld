module.exports = function (sequelize, dataTypes) {
    let alias ='Characters';
    let cols ={
        id: {

            type: dataTypes.INTERGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        name: {

        type: dataTypes.STRING,
        },

        age: {

            type: dataTypes.INTERGER,
        },

        image: {

            type: dataTypes.STRING,
        },

        weight: {

            type: dataTypes.INTERGER,
        },

        history: {

            dataTypes: dataTypes.STRING,
        },

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