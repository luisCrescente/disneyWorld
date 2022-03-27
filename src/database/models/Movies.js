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

        genre_id: {
            type: dataTypes.INTEGER,
            allowNull:false,
            field: 'genre_id'
        }
    };

    let config = {
        tableName: 'movies',
        timestamps: false,
    };

    let Movies = sequelize.define(alias, cols, config);

    Movies.associate = function(models){

        Movies.belongsTo(models.Genre, {
            as:'genres',
            foreignKey:'genre_id',
        });

        Movies.belongsToMany(models.Characters, {
            
            as:'characters',
            through:'character_movie',
            foreignKey:'movie_id',
            otherKey:'character_id',
            timestamps: false,
        })
    
    }

    return Movies;
}