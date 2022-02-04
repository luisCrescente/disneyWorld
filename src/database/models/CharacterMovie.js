module.exports = function (sequelize, dataTypes) {
    let alias = 'CharacterMovie';
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

    let CharacterMovie = sequelize.define(alias, cols, config);

    CharacterMovie.associate = function(models){

        CharacterMovie.belongsTo(models.Characters,{
        as: 'characters',
        foreignKey: 'character_id'
    }),

    CharacterMovie.belongsTo(models.Movies,{
        as: 'movies',
        foreignKey: 'movie_id'
    })

        }
        return CharacterMovie;

}