const express = require("express");
const fs = require("fs");
const app = express();

app.listen(3030, () => console.log('Server running in 3030 port'));

const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));

app.get('/', (req, res) => {
    res.send("Ni Superman, IronMan o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!.");
});

app.get('/heroes', (req, res) => {
    res.send(heroes);
});

app.get('/heroes/detalle/:id', (req, res) => {
    const heroe = heroes.find(h => h.id == req.params.id);
    if (heroe) {
        res.send(`Hola, mi nombre es ${heroe.nombre} y soy ${heroe.profesion}`);
    } else {
        res.send("No se encontró a ese héroe");
    }
});

app.get('/heroes/:id/bio/:ok?', (req, res) => {
    let heroe = heroes.find(hero => hero.id == req.params.id);
    if (!heroe) {
        res.send("No encontramos un héroe para mostrarte su biografía");
    } else {
        if (req.params.ok == "ok") {
            res.send(`${heroe.nombre}: ${heroe.resenia}`);
        } else {
            res.send(`${heroe.nombre}: Lamento que no desees saber más de mi :(`);
        }
    }
});

app.get('/creditos', (req, res) => {
    res.send("Créditos a Germán Silva");
});

// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
    res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});