const {check} = require("express-validator");

const moviesValidation = [
    check("title")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("El título es obligatorio")
        .isLength({min: 10, max: 500}).withMessage("El título no puede tener menos de 10 caracteres ni más de 500"),
    check("rating")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("El rating es obligatorio")
        .isFloat({no_symbols: true}).withMessage("El rating no puede contener símbolos")
        .isFloat({min: 0, max: 10}).withMessage("El rating no puede ser menor a 0 ni mayor a 10"),
    check("awards")
        .exists().withMessage("Error de seguridad")
        .trim()
        .notEmpty().withMessage("La cantidad de premios es obligatoria")
        .isInt({min: 0}).withMessage("La cantidad de premios no puede ser menor a 0")
        .isInt({no_symbols: true}).withMessage("La cantidad de premios no puede contener símbolos"),
    check("length")
        .optional({nullable: true, checkFalsy: true})
        .exists().withMessage("Error de seguridad")
        .trim()
        .isInt({no_symbols: true}).withMessage("La duración no puede contener símbolos")
        .isInt({min: 0}).withMessage("La duración no puede ser menor a 0"),
    check("release_date")
        .exists().withMessage("Error de seguridad")
        .trim()
        .matches(/\d{1,2}\/\d{1,2}\/\d{4}/).withMessage("La fecha ingresada no tiene un formato correcto")
        .notEmpty().withMessage("La fecha de estreno es obligatoria"),
    check("genre")
        .optional({nullable: true, checkFalsy: true})
        .exists().withMessage("Error de seguridad")
        .trim()
        .isInt({no_symbols: true}).withMessage("El id del género no puede contener símbolos")
];

module.exports = moviesValidation;