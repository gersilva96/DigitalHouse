const { Actors, Movies, ActorMovie } = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const actorsController = {
    list: async (req, res) => {
        try {
            const actors = await Actors.findAll();
            res.render("actors/list", { actors });
        } catch (error) {
            res.render("error", { error });
        }
    },
    detail: async (req, res) => {
        try {
            const actor = await Actors.findByPk(req.params.id, {
                include: [
                    { association: "favorite_movie" },
                    { association: "movies" }
                ]
            });
            res.render("actors/detail", { actor });
        } catch (error) {
            res.render("error", { error });
        }
    },
    recommended: async (req, res) => {
        try {
            const actors = await Actors.findAll({
                where: {
                    rating: {
                        [Op.gte]: 8
                    }
                }
            });
            res.render("actors/recommended", { actors });
        } catch (error) {
            res.render("error", { error });
        }
    },
    create: async (req, res) => {
        try {
            const movies = await Movies.findAll({ attributes: ["id", "title"] });
            res.render("actors/create", { movies });
        } catch (error) {
            res.render("error", { error });
        }
    },
    store: async (req, res) => {
        try {
            let errors = validationResult(req);
            const { first_name, last_name, rating, favorite_movie_id } = req.body;
            const exists = await Actors.findOne({
                where: {
                    [Op.and]: [
                        { first_name },
                        { last_name }
                    ]
                }
            });
            if (exists != undefined) {
                errors.errors.push({
                    msg: 'Ya existe alguien con ese nombre',
                    location: 'body'
                });
            }
            if (errors.isEmpty()) {
                await Actors.create({
                    first_name,
                    last_name,
                    rating,
                    favorite_movie_id
                });
                const { id } = await Actors.findOne({ order: [["id", "DESC"]], attributes: ["id"] });
                res.redirect(`/actors/detail/${id}`);
            } else {
                const movies = await Movies.findAll({ attributes: ["id", "title"] });
                res.render("actors/create", { movies, errors: errors.errors });
            }
        } catch (error) {
            res.render("error", { error });
        }
    },
    edit: async (req, res) => {
        try {
            const actor = await Actors.findByPk(req.params.id);
            const movies = await Movies.findAll({ attributes: ["id", "title"] });
            res.render("actors/edit", { actor, movies });
        } catch (error) {
            res.render("error", { error });
        }
    },
    update: async (req, res) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                const { first_name, last_name, rating, favorite_movie_id } = req.body;
                await Actors.update({
                    first_name,
                    last_name,
                    rating,
                    favorite_movie_id
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.redirect(`/actors/detail/${req.params.id}`);
            } else {
                const actor = await Actors.findByPk(req.params.id);
                const movies = await Movies.findAll({ attributes: ["id", "title"] });
                res.render("actors/edit", { actor, movies, errors: errors.errors })
            }
        } catch (error) {
            res.render("error", { error });
        }
    },
    delete: async (req, res) => {
        try {
            await ActorMovie.destroy({
                where: {
                    actor_id: req.params.id
                }
            });
            await Actors.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect("/actors");
        } catch (error) {
            res.render("error", { error });
        }
    },
};

module.exports = actorsController;