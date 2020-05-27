const fs = require("fs");
const path = require("path");

// Lee el archivo Json
function readJSONfile() {
    return JSON.parse(fs.readFileSync(userController.archivo, 'utf-8'));
}

const userController = {
    login: (req, res) => {
        res.render("login");
    },

    register: (req, res) => {
        res.render("register");
    },

    archivo: path.join(__dirname, "..", "data", "usuarios.json"),

    searchByEmail: function (email) {
        let archivoJson = readJSONfile();
        let user = null;
        archivoJson.forEach((elem, i) => {
            if (elem["email"] == email) {
                user = elem;
            }
        });
        return user; // si no lo encuentra devuelve null
    },

    profile: (req, res) => {
        let usuario = userController.searchByEmail(req.params.email);
        res.render('profile', { usuario });
    },

    newUser: (req, res) => {
        const user = {
            nombre: req.body.name,
            apellido: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            avatar: "avatar"
        };
        console.log(req.body);
        let archivoJSON = readJSONfile();
        archivoJSON.push(user);
        let archivoStringifiado = JSON.stringify(archivoJSON);
        fs.writeFileSync(path.join(__dirname, "..", "data", "usuarios.json"), archivoStringifiado);
        res.render("profile", { usuario: user });
    }
};

module.exports = userController;