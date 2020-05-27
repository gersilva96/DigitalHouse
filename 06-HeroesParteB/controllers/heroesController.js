const fs = require("fs");
const heroes = JSON.parse(fs.readFileSync(`${__dirname}/../data/heroes.json`, "utf-8"));

const heroesController = {
    mostrar: (req, res) => {
        res.send(heroes);
    },
    detalle: (req, res) => {
        const heroe = heroes.find(hero => hero.id == req.params.id);
        if (heroe) {
            res.send(`Hola, mi nombre es ${heroe.nombre} y soy ${heroe.profesion}`);
        } else {
            res.send("No se encontró a ese héroe");
        }
    },
    biografia: (req, res) => {
        const heroe = heroes.find(hero => hero.id == req.params.id);
        if (!heroe) {
            res.send("No encontramos un héroe para mostrarte su biografía");
        } else {
            if (req.params.ok == "ok") {
                res.send(`${heroe.nombre}: ${heroe.resenia}`);
            } else {
                res.send(`${heroe.nombre}: Lamento que no desees saber más de mi :(`);
            }
        }
    }
};

module.exports = heroesController;