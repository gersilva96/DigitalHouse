const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usersFile = path.join(__dirname, "..", "data", "users.json");
const readJSONfile = () => JSON.parse(fs.readFileSync(usersFile, "utf-8"));
const searchByEmail = email => {
    let archivoJson = readJSONfile();
    let userFound = null;
    archivoJson.forEach(elem => {
        if (elem["email"] == email) {
            userFound = elem;
        }
    });
    return userFound; // si no lo encuentra devuelve null
};

const userController = {
    login: (req, res) => {
        const mensaje = null;
        res.render("login", {mensaje});
    },

    enter: (req, res) => {
        const user = searchByEmail(req.body.email);
        let mensaje = null;
        if (user != null) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send("Estás logueado!");
            } else {
                mensaje = "La contraseña ingresada no es válida";
                res.render("login", {mensaje});
            }
        } else {
            mensaje = "El usuario no existe";
            res.render("login", {mensaje});
        }
    },

    register: (req, res) => {
        res.render("register");
    },

    create: (req, res) => {
        if (req.body.password == req.body.repeat_password) {
            const user = {
                nombre: req.body.name,
                apellido: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: "avatar"
            };
            let archivoJSON = readJSONfile();
            archivoJSON.push(user);
            let archivoStringifiado = JSON.stringify(archivoJSON);
            fs.writeFileSync(usersFile, archivoStringifiado);
            res.render("profile", { usuario: user });
        } else {
            res.redirect("/register", {errors: errrors.errors});
        }
    },

    profile: (req, res) => {
        let usuario = searchByEmail(req.params.email);
        res.render('profile', { usuario });
    },
};

module.exports = userController;