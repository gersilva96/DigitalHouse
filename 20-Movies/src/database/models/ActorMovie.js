module.exports = (sequelize, dataTypes) => {

    const alias = "ActorMovie";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        actor_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        movie_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };

    const config = {
        tableName: "actor_movie",
        timestamps: false
    };

    const ActorMovie = sequelize.define(alias, cols, config);

    return ActorMovie;
};