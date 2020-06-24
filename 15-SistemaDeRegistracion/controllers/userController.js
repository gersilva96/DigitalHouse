const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const userController = {
    usersFile: path.join(__dirname, "..", "data", "users.json"),

    readJSONfile: () => JSON.parse(fs.readFileSync(userController.usersFile, "utf-8")),

    saveJSONfile: (file) => fs.writeFileSync(userController.usersFile, JSON.stringify(file)),

    getNewId: () => {
        const users = userController.readJSONfile();
        let lastId = 0;
        users.forEach(user => {
            if(user.id > lastId) {
                lastId = user.id;
            }
        });
        return lastId+=1;
    },

    searchByEmail: email => {
        let archivoJson = userController.readJSONfile();
        let userFound = null;
        archivoJson.forEach(elem => {
            if (elem["email"] == email) {
                userFound = elem;
            }
        });
        return userFound; // si no lo encuentra devuelve null
    },

    login: (req, res) => {
        const mensaje = null;
        res.render("login", {mensaje});
    },

    enter: (req, res) => {
        const user = userController.searchByEmail(req.body.email);
        let mensaje = null;
        if (user != null) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.render("profile", { usuario: user });
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
                id: userController.getNewId(),
                nombre: req.body.name,
                apellido: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename
            };
            let archivoJSON = userController.readJSONfile();
            archivoJSON.push(user);
            userController.saveJSONfile(archivoJSON);
            res.render("profile", { usuario: user });
        } else {
            res.render("/users/register", {errors: errrors.errors});
        }
    },

    profile: (req, res) => {
        let usuario = null;
        res.render('profile', { usuario });
    },
};

module.exports = userController;