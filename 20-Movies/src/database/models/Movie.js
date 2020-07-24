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

    return Movie;
};