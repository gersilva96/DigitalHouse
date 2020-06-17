const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usersFile = path.join(__dirname, "..", "data", "users.json");
const readJSONfile = () => JSON.parse(fs.readFileSync(usersFile, "utf-8"));
const saveJSONfile = (file) => fs.writeFileSync(usersFile, JSON.stringify(file));
const getNewId = () => {
    const users = readJSONfile();
    let lastId = 0;
    users.forEach(user => {
        if(user.id > lastId) {
            lastId = user.id;
        }
    });
    return lastId+=1;
};
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
                id: getNewId(),
                nombre: req.body.name,
                apellido: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: "avatar"
            };
            let archivoJSON = readJSONfile();
            archivoJSON.push(user);
            saveJSONfile(archivoJSON);
            res.redirect(`/profile/${user.id}`, { usuario: user });
        } else {
            res.redirect("/register", {errors: errrors.errors});
        }
    },

    profile: (req, res) => {
        let usuario = null;
        res.render('profile', { usuario });
    },
};

module.exports = userController;