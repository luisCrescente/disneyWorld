module.exports = function (sequelize, dataTypes) {
    let alias = 'Genre';
    let cols = {
        id:{
            
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{

            type: dataTypes.STRING,
        }
    };

    let config = {
        tableName = 'genres',
        tiemestamps = false,
    };

    let Genre = sequelize.define(alias, cols, config);

    Genre.associate = function(models){
        Genre.hasMany(models.Movies,{
            as:'movies',
            foreignKey:'id_genre',
        });
    };

    return Genre;

}