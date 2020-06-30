const recordarColor = (req,res,next) => {    //Si hay una cookie vigente con información del usuario, guarda al usuario en la sesión
    if (req.cookies.style != undefined && req.session.style == undefined) {
        req.session.style = req.cookies.style;
        req.session.color = req.cookies.color;
    }
    next();
};

module.exports = recordarColor;