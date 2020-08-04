const { Genres } = require("../database/models");

const genresController = {
    list: async (req, res) => {
        try {
            const genres = await Genres.findAll();
            res.render("genres/list", { genres });
        } catch (error) {
            res.render("error", { error });
        }
    },
    detail: async (req, res) => {
        try {
            const genre = await Genres.findByPk(req.params.id, {
                include: [
                    { association: "movies" }
                ]
            });
            res.render("genres/detail", { genre });
        } catch (error) {
            res.render("error", { error });
        }
    }
};

module.exports = genresController;