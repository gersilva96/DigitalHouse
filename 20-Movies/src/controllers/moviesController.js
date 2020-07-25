const {Movies, Genres, Actors, ActorMovie} = require("../database/models");
const {Op} = require("sequelize");
const {validationResult} = require("express-validator");

const moviesController = {
    list: async (req, res) => {
        try {
            const movies = await Movies.findAll();
            res.render("movies/list", {movies});
        } catch(error) {
            res.render("error", {error});
        }
    },
    detail: async (req, res) => {
        try {
            const movie = await Movies.findByPk(req.params.id,{
                include: [
                    {association: "actors"},
                    {association: "genre"}
                ]
            });
            res.render("movies/detail", {movie});
        } catch(error) {
            res.render("error", {error});
        }
    },
    new: async (req, res) => {
        try {
            const movies = await Movies.findAll({
                limit: 5,
                order: [
                    ["release_date", "DESC"]
                ]
            });
            res.render("movies/new", {movies});
        } catch(error) {
            res.render("error", {error});
        }
    },
    recommended: async (req, res) => {
        try {
            const movies = await Movies.findAll({
                where: {
                    rating: {
                        [Op.gte]: 8
                    }
                }
            });
            res.render("movies/recommended", {movies});
        } catch(error) {
            res.render("error", {error});
        }
    },
    create: async (req, res) => {
        try {
            const genres = await Genres.findAll();
            const actors = await Actors.findAll();
            res.render("movies/create", {genres, actors});
        } catch(error) {
            res.render("error", {error});
        }
    },
    store: async (req, res) => {
        try {
            let errors = validationResult(req);
            if (req.body.genre != undefined) {
                const genre = await Genres.findByPk(req.body.genre);
                if (genre == undefined) {
                    let newError = {
                        value: '',
                        msg: 'El id de género ingresado no corresponde a ningún género',
                        param: 'genre',
                        location: 'body'
                    }
                    errors.errors.push(newError);
                }
            }
            if (errors.isEmpty()) {
                if (req.body.genre == undefined && req.body.length != undefined) {
                    await Movies.create({
                        title: req.body.title,
                        rating: parseFloat(req.body.rating),
                        awards: parseInt(req.body.awards),
                        length: parseInt(req.body.length),
                        release_date: req.body.release_date
                    });
                } else if (req.body.genre != undefined && req.body.length == undefined) {
                    await Movies.create({
                        title: req.body.title,
                        rating: parseFloat(req.body.rating),
                        awards: parseInt(req.body.awards),
                        release_date: req.body.release_date,
                        genre_id: parseInt(req.body.genre)
                    });
                } else if (req.body.genre == undefined && req.body.length == undefined) {
                    await Movies.create({
                        title: req.body.title,
                        rating: parseFloat(req.body.rating),
                        awards: parseInt(req.body.awards),
                        release_date: req.body.release_date
                    });
                } else if (req.body.genre != undefined && req.body.length != undefined) {
                    await Movies.create({
                        title: req.body.title,
                        rating: parseFloat(req.body.rating),
                        awards: parseInt(req.body.awards),
                        length: parseInt(req.body.length),
                        release_date: req.body.release_date,
                        genre_id: parseInt(req.body.genre)
                    });
                }
                res.redirect("/movies");
            } else {
                const genres = await Genres.findAll();
                const actors = await Actors.findAll();
                res.render("movies/create", {genres, actors, errors: errors.errors});
            }
        } catch(error) {
            res.render("error", {error});
        }
    },
    edit: async (req, res) => {
        try {
            const movie = await Movies.findByPk(req.params.id);
            const genres = await Genres.findAll();
            const actors = await Actors.findAll();
            res.render("movies/edit", {movie, genres, actors});
        } catch(error) {
            res.render("error", {error});
        }
    },
    update: async (req, res) => {
        try {
            let errors = validationResult(req);
            if (req.body.genre != undefined) {
                const genre = await Genres.findByPk(req.body.genre);
                if (genre == undefined) {
                    let newError = {
                        value: '',
                        msg: 'El id de género ingresado no corresponde a ningún género',
                        param: 'genre',
                        location: 'body'
                    }
                    errors.errors.push(newError);
                }
            }
            if (errors.isEmpty()) {
                if (req.body.genre == undefined && req.body.length != undefined) {
                    await Movies.update({
                        title: req.body.title,
                        rating: parseFloat(req.body.rating),
                        awards: parseInt(req.body.awards),
                        length: parseInt(req.body.length),
                        release_date: req.body.release_date
                    }, {
                        where: {
                            id: req.params.id
                        }
                    });
                } else if (req.body.genre != undefined && req.body.length == undefined) {
                    await Movies.update({
                        title: req.body.title,
                        rating: parseFloat(req.body.rating),
                        awards: parseInt(req.body.awards),
                        release_date: req.body.release_date,
                        genre_id: parseInt(req.body.genre)
                    }, {
                        where: {
                            id: req.params.id
                        }
                    });
                } else if (req.body.genre == undefined && req.body.length == undefined) {
                    await Movies.update({
                        title: req.body.title,
                        rating: parseFloat(req.body.rating),
                        awards: parseInt(req.body.awards),
                        release_date: req.body.release_date
                    }, {
                        where: {
                            id: req.params.id
                        }
                    });
                } else if (req.body.genre != undefined && req.body.length != undefined) {
                    await Movies.update({
                        title: req.body.title,
                        rating: parseFloat(req.body.rating),
                        awards: parseInt(req.body.awards),
                        length: parseInt(req.body.length),
                        release_date: req.body.release_date,
                        genre_id: parseInt(req.body.genre)
                    }, {
                        where: {
                            id: req.params.id
                        }
                    });
                }
                res.redirect("/movies");
            } else {
                const movie = await Movies.findByPk(req.params.id);
                const genres = await Genres.findAll();
                const actors = await Actors.findAll();
                res.render("movies/edit", {movie, genres, actors, errors: errors.errors});
            }
        } catch(error) {
            res.render("error", {error});
        }
    },
    delete: async (req, res) => {
        try {
            const movie = await Movies.findByPk(req.params.id);
            await ActorMovie.destroy({
                where: {
                    movie_id: movie.id
                }
            });
            await Movies.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect("/movies");
        } catch(error) {
            res.render("error", {error});
        }
    }
};

module.exports = moviesController;