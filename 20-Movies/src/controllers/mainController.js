const db = require("../database/models");
const { Op } = require("sequelize");

let mainController = {
    home: async (req, res) => {
        try {
            res.render("index", { title: 'Movies - DH' });
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    },
    search: async (req, res) => {
        try {
            //Actores
            const actors = await db.Actors.findAll();
            let actorsResults = [];
            actors.forEach(actor => {
                if (`${actor.first_name.toLowerCase()} ${actor.last_name.toLowerCase()}`.includes(req.query.keywords.toLowerCase())) {
                    actorsResults.push(actor);
                }
            });
            //Películas
            const movies = await db.Movies.findAll({
                where: {
                    title: {
                        [Op.substring]: req.query.keywords
                    }
                }
            });

            res.render("results", {actors: actorsResults, movies, title: `Buscando: ${req.query.keywords}`});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    }
};

module.exports = mainController;