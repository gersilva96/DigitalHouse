const db = require("../database/models");
const { Op } = require("sequelize");

const actorsController = {
    list: async (req, res) => {
        try {
            const actors = await db.Actors.findAll();
            res.render("actors/list", {actors, title: "Todos los actores"});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    },
    detail: async (req, res) => {
        try {
            const actor = await db.Actors.findByPk(req.params.id);
            res.render("actors/detail", {actor});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    },
    recommended: async (req, res) => {
        try {
            const actors = await db.Actors.findAll({
                where: {
                    rating: {
                        [Op.gte]: 8
                    }
                }
            });
            res.render("actors/recommended", {actors, title: "Los más recomendados"});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    },
    search: async (req, res) => {
        try {
            let results = [];
            const actors = await db.Actors.findAll();
            actors.forEach(actor => {
                if (`${actor.first_name.toLowerCase()} ${actor.last_name.toLowerCase()}`.includes(req.query.keywords.toLowerCase())) {
                    results.push(actor);
                }
            });
            res.render("actors/results", {actors: results, title: `Buscando: ${req.query.keywords}`});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    }
};

module.exports = actorsController;