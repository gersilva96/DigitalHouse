const db = require("../database/models");
const { Op } = require("sequelize");

const moviesController = {
    list: async (req, res) => {
        try {
            const movies = await db.Movies.findAll();
            res.render("movies/list", {movies, title: "Todas las películas"});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    },
    detail: async (req, res) => {
        try {
            const movie = await db.Movies.findByPk(req.params.id);
            res.render("movies/detail", {movie});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    },
    new: async (req, res) => {
        try {
            const movies = await db.Movies.findAll({
                limit: 5,
                order: [
                    ["release_date", "DESC"]
                ]
            });
            res.render("movies/new", {movies, title: "Las más recientes"});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    },
    recommended: async (req, res) => {
        try {
            const movies = await db.Movies.findAll({
                where: {
                    rating: {
                        [Op.gte]: 8
                    }
                }
            });
            res.render("movies/recommended", {movies, title: "Las más recomendadas"});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    },
    search: async (req, res) => {
        try {
            const movies = await db.Movies.findAll({
                where: {
                    title: {
                        [Op.substring]: req.query.keywords
                    }
                }
            });
            res.render("movies/results", {movies, title: `Buscando: ${req.query.keywords}`});
        } catch(error) {
            res.render("error", {error, message: "Error"});
        }
    }
};

module.exports = moviesController;