module.exports = (sequelize, dataTypes) => {

    const alias = "Movies";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        length: {
            type: dataTypes.INTEGER.UNSIGNED
        },
        genre_id: {
            type: dataTypes.INTEGER.UNSIGNED
        }
    };

    const config = {
        tableName: "movies",
        timestamps: false
    };

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = (models) => {
        Movie.belongsToMany(models.Actors, {
            as: "actors",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        });
        Movie.hasMany(models.Actors, {
            as: "favorite_movie",
            foreignKey: "favorite_movie_id",
            timestamps: false
        })
        Movie.belongsTo(models.Genres, {
            as: "genre",
            foreignKey: "genre_id",
            timestamps: false
        });
    };

    return Movie;
};