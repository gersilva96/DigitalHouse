const { check } = require("express-validator");

const actorsValidation = [
    check("first_name")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacío")
        .isLength({ min: 2, max: 100 }).withMessage("El nombre no puede tener menos de 2 caracteres ni más de 100"),
    check("last_name")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("El apellido no puede estar vacío")
        .isLength({ min: 2, max: 100 }).withMessage("El apellido no puede tener menos de 2 caracteres ni más de 100"),
    check("rating")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("El rating es obligatorio")
        .isFloat({ no_symbols: true }).withMessage("El rating no puede contener símbolos")
        .isFloat({ min: 0, max: 10 }).withMessage("El rating no puede ser menor a 0 ni mayor a 10"),
    check("favorite_movie_id")
        .optional({ nullable: true, checkFalsy: true })
        .exists().withMessage("Error de seguridad")
        .trim()
        .isInt({ no_symbols: true }).withMessage("El id de la película no puede contener símbolos")
        .isInt({ min: 0 }).withMessage("El id de la película no puede ser menor a 0"),
];

module.exports = actorsValidation;