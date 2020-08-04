const { check } = require("express-validator");

const linkValidation = [
    check("actor_id")
        .exists().withMessage("Error de seguridad")
        .trim()
        .isInt({ no_symbols: true }).withMessage("El id no puede contener símbolos")
        .isInt({ min: 0 }).withMessage("El id no puede ser menor a 0"),
    check("movie_id")
        .exists().withMessage("Error de seguridad")
        .trim()
        .isInt({ no_symbols: true }).withMessage("El id no puede contener símbolos")
        .isInt({ min: 0 }).withMessage("El id no puede ser menor a 0"),
];

module.exports = linkValidation;