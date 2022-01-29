module.exports = (sequelize, dataTypes)=>{
    let alias = 'Movies';
    let cols ={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {

            type: dataTypes.STRING,
        },

        image: {
            
            type: dataTypes.STRING,
        },

        release_date: {
            
            type: dataTypes.DATE,
        },

        rating: {

            type: dataTypes.INTEGER,
        },

        id_genre: {
            type: dataTypes.INTEGER,
        }
    };

    let config = {
        tableName: 'movies',
        timestamps: true,
    };

    let Movies = sequelize.define(alias, cols, config);

    Movies.associate = function(models){

        Movies.belongsTo(models.Genre, {
            
            as:'genres',
            foreingKey:'id_genre',
        });

        Movies.belongsToMany(models.Characters, {
            
            as:'characters',
            through:'character_movie',
            foreingKey:'id_movie',
            otherKey:'id_character',
            tiemestamps: false,
        })
    
    }

    return Movies;
}