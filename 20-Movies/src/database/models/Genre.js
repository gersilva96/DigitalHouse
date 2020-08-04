module.exports = (sequelize, dataTypes) => {

    const alias = "Genres";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        ranking: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true
        },
        active: {
            type: dataTypes.INTEGER(1),
            allowNull: false
        }
    };

    const config = {
        tableName: "genres"
    };

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
        Genre.hasMany(models.Movies, {
            as: "movies",
            foreignKey: "genre_id",
            timestamps: false
        });
    };

    return Genre;
};