const { Actors, Movies, Genres } = require("../database/models");
const { Op } = require("sequelize");

let mainController = {
    home: async (req, res) => {
        try {
            res.render("index");
        } catch (error) {
            res.render("error", { error });
        }
    },
    search: async (req, res) => {
        try {
            //Actores
            const allActors = await Actors.findAll();
            let actors = [];
            allActors.forEach(actor => {
                if (`${actor.first_name.toLowerCase()} ${actor.last_name.toLowerCase()}`.includes(req.query.keywords.toLowerCase())) {
                    actors.push(actor);
                }
            });
            //Películas
            const movies = await Movies.findAll({
                where: {
                    title: {
                        [Op.substring]: req.query.keywords
                    }
                }
            });
            //Géneros
            const genres = await Genres.findAll({
                where: {
                    name: {
                        [Op.substring]: req.query.keywords
                    }
                }
            });
            res.render("results", { actors, movies, genres, search: req.query.keywords });
        } catch (error) {
            res.render("error", { error });
        }
    }
};

module.exports = mainController;