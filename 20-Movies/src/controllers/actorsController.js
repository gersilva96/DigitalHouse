const {Actors} = require("../database/models");
const {Op} = require("sequelize");

const actorsController = {
    list: async (req, res) => {
        try {
            const actors = await Actors.findAll();
            res.render("actors/list", {actors});
        } catch(error) {
            res.render("error", {error});
        }
    },
    detail: async (req, res) => {
        try {
            const actor = await Actors.findByPk(req.params.id,{
                include: [
                    {association: "favorite_movie"},
                    {association: "movies"}
                ]
            });
            res.render("actors/detail", {actor});
        } catch(error) {
            res.render("error", {error});
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
            res.render("actors/recommended", {actors});
        } catch(error) {
            res.render("error", {error});
        }
    }
};

module.exports = actorsController;