const { Actors, Movies, ActorMovie } = require("../database/models");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const actingsController = {
    add: async (req, res) => {
        try {
            const actors = await Actors.findAll({attributes: ["id", "first_name", "last_name"]});
            const movies = await Movies.findAll({attributes: ["id", "title"]});
            res.render("actings/add", { actors, movies });
        } catch (error) {
            res.render("error", { error });
        }
    },
    store: async (req, res) => {
        try {
            let errors = validationResult(req);
            const actors = await Actors.findAll({attributes: ["id", "first_name", "last_name"]});
            const movies = await Movies.findAll({attributes: ["id", "title"]});
            const { actor_id, movie_id } = req.body;
            const exists = await ActorMovie.findOne({
                where: {[Op.and]: {
                    actor_id,
                    movie_id
                }}
            });
            const actor = await Actors.findByPk(actor_id);
            const movie = await Movies.findByPk(movie_id);
            if (exists != undefined) {
                errors.errors.push({
                    msg: 'Ya existe este vínculo',
                    location: 'body'
                });
            }
            if (actor == undefined || movie == undefined) {
                errors.errors.push({
                    msg: 'Error al seleccionar la película y/o actor/actriz',
                    location: 'body'
                });
            }
            if (errors.isEmpty()) {
                await ActorMovie.create({
                    actor_id,
                    movie_id
                });
                res.render("actings/add", { actors, movies, mensaje: "Actuación agregada correctamente" });
            } else {
                res.render("actings/add", { actors, movies, errors: errors.errors });
            }
        } catch (error) {
            res.render("error", { error });
        }
    },
    delete: async (req, res) => {
        try {
            const actors = await Actors.findAll({attributes: ["id", "first_name", "last_name"]});
            const movies = await Movies.findAll({attributes: ["id", "title"]});
            res.render("actings/delete", { actors, movies });
        } catch (error) {
            res.render("error", { error });
        }
    },
    destroy: async (req, res) => {
        try {
            let errors = validationResult(req);
            const actors = await Actors.findAll({attributes: ["id", "first_name", "last_name"]});
            const movies = await Movies.findAll({attributes: ["id", "title"]});
            const { actor_id, movie_id } = req.body;
            const acting = await ActorMovie.findOne({where: {
                [Op.and]: [
                    { actor_id },
                    { movie_id }
                ]
            }});
            if (acting == undefined) {
                errors.errors.push({
                    msg: 'No existe la actuación seleccionada',
                    location: 'body'
                });
            }
            if (errors.isEmpty()) {
                await ActorMovie.destroy({
                    where: {
                        [Op.and]: [
                            { actor_id },
                            { movie_id }
                        ]
                    }
                });
                res.render("actings/delete", { actors, movies, mensaje: "Actuación eliminada correctamente" });
            } else {
                res.render("actings/delete", { actors, movies, errors: errors.errors });
            }
        } catch (error) {
            res.render("error", { error });
        }
    }
};

module.exports = actingsController;