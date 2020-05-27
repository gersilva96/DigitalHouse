const express = require("express");
const app = express();

const port = 3030;

const rutasHeroes = require("./routes/heroes");
const rutasMain = require("./routes/main");

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));

app.use("/", rutasMain);
app.use("/heroes", rutasHeroes);