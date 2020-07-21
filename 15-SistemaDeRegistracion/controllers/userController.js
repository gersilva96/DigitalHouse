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
        archivoJson.forEach(user => {
            if (user["email"] == email) {
                userFound = user;
            }
        });
        return userFound; // si no lo encuentra devuelve null
    },

    searchById: id => {
        let archivoJson = userController.readJSONfile();
        let userFound = null;
        archivoJson.forEach(user => {
            if (user["id"] == id) {
                userFound = user;
            }
        });
        return userFound; // si no lo encuentra devuelve null
    },

    login: (req, res) => {
        res.render("login");
    },

    enter: (req, res) => {
        const user = userController.searchByEmail(req.body.email);
        if (user != null) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.redirect(`/users/profile/${user.id}`);
            } else {
                let mensaje = "La contraseña ingresada no es válida";
                res.render("login", {mensaje});
            }
        } else {
            let mensaje = "El usuario no existe";
            res.render("login", {mensaje});
        }
    },

    register: (req, res) => {
        res.render("register");
    },

    create: (req, res) => {
        if (userController.searchByEmail(req.body.email) == null) {
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
                res.redirect(`/users/profile/${user.id}`);
            } else {
                let mensaje = "Las contraseñas no coinciden";
                res.render("register", {mensaje});
            }
        } else {
            let mensaje = "Ya existe un usuario con el email ingresado";
            res.render("register", {mensaje});
        }
    },

    profile: (req, res) => {
        const user = userController.searchById(req.params.id);
        res.render("profile", {user});
    },
};

module.exports = userController;