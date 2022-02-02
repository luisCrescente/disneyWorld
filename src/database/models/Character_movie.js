module.exports = function (sequelize, dataTypes) {
    let alias = 'Character_movie';
    let cols ={
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

       character_id:{
            type: dataTypes.INTEGER,
            allowNull:false
        },

        movie_id:{
            type: dataTypes.INTEGER,
            allowNull:false
        }
    };

    let config ={
        tableName: 'character_movie',
        timesTamps: false
    };

    const Character_movie = sequelize.define(alias, cols, config);

    Character_movie.associate = function(models){

    Character_movie.belongsTo(models.Characters,{
        as: 'characters',
        foreignKey: 'character_id'
    }),

    Character_movie.belongsTo(models.Movies,{
        as: 'movies',
        foreignKey: 'movie_id'
    })

        }
        return Character_movie;

}