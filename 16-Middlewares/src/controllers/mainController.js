const mainController = {
    home: (req, res) => {
        res.send("Hola mundo");
    },
    ruta1: (req, res) => {
        res.send("Ruta 1");
    },
    ruta2: (req, res) => {
        res.send("Ruta 2");
    },
    ruta3: (req, res) => {
        res.send("Ruta 3");
    },
    admin: (req, res) => {
        res.send(`Hola admin: ${req.query.user}`);
    }
};

module.exports = mainController;