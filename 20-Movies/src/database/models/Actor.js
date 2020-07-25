module.exports = (sequelize, dataTypes) => {

    const alias = "Actors";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1)
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER.UNSIGNED
        }
    };

    const config = {
        tableName: "actors",
        timestamps: false
    };

    const Actor = sequelize.define(alias, cols, config);

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movies, {
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        });
        Actor.belongsTo(models.Movies, {
            as: "favorite_movie",
            foreignKey: "favorite_movie_id",
            timestamps: false
        });
    };

    return Actor;
};